import { Donation } from "../models/Donate.js";


import XLSX from "xlsx";
import * as yup from "yup";
import fs from "fs";
import path from "path";
import { log } from "console";


// helper → Excel column letter
const getNameFromNumber = (num) => {
  let str = "";
  while (num > 0) {
    let rem = (num - 1) % 26;
    str = String.fromCharCode(65 + rem) + str;
    num = Math.floor((num - 1) / 26);
  }
  return str;
};


export const importExcelDonations = async (req, res) => {
  try {
    if (!req.file?.path)
      throw new Error("Please upload '.xlsx' file..!!");

    if (
      req.file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      throw new Error("Please upload '.xlsx' file only..!!");
    }

    const workbook = XLSX.readFile(req.file.path);

    let exportData = [];
    let errorsCount = 0;

    // ========= VALIDATION SCHEMA =========
    const validationSchema = yup.object().shape({
      Donor: yup.string().trim().min(2).max(100).required(),
      Email: yup.string().email("Invalid email").required(),
      Phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required(),
      Amount: yup.number().positive().required(),
      Method: yup
        .string()
        .oneOf(["UPI", "Bank Transfer", "Cash", "Card", "Other"])
        .required(),
      Message: yup.string().nullable(),
    });

    // ========= READ ALL SHEETS =========
    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const rows = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[i]]
      );

      for (let row of rows) {
        try {
          await validationSchema.validate(row, { abortEarly: false });

          exportData.push({
            donorName: row.Donor?.trim(),
            email: row.Email?.toLowerCase().trim(),
            phone: row.Phone?.trim(),
            amount: Number(row.Amount),
            paymentMethod: row.Method?.trim(),
            message: row.Message || "",
            source: "excel",
            error: null,
          });

        } catch (err) {
          errorsCount++;

          exportData.push({
            ...row,
            error: err.inner?.reduce((acc, e) => {
              acc[e.path] = e.message;
              return acc;
            }, {}),
          });
        }
      }
    }

    // ========= ERROR SHEET =========
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    exportData.forEach((row, i) => {
      const { error } = row;

      ["Donor", "Email", "Phone", "Amount", "Method"].forEach(
        (key, j) => {
          if (error?.[key]) {
            const col = getNameFromNumber(j + 1);
            const cell = `${col}${i + 2}`;

            if (!worksheet[cell]) worksheet[cell] = { t: "s", v: "" };

            worksheet[cell].c = [
              { t: `${key}: ${error[key]}`, hidden: true },
            ];
          }
        }
      );
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Donations");

    const dir = path.join(process.cwd(), "public/uploads/import-errors");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = `uploads/import-errors/donations-${req.file.originalname}`;
    XLSX.writeFile(wb, "./public/" + filePath);

    // ========= IF ERRORS =========
    if (errorsCount > 0) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      return res.status(422).json({
        success: false,
        message: "Invalid Data Provided",
        download: `${baseUrl}/${filePath}`,
      });
    }

    // ========= APPLY BUSINESS LOGIC =========
    for (let d of exportData) {
      if (d.error) continue;

      // 🔍 Match record
      const existing = await Donation.findOne({
        email: d.email,
        phone: d.phone,
        amount: d.amount,
      });

      if (!existing) {
        // 👉 create new excel donation
        await Donation.create(d);
      } else if (existing.source === "manual") {
        // 👉 convert manual -> excel
        existing.source = "excel";
        await existing.save();
      } 
      // else -> already excel => do nothing
    }

    return res.json({
      success: true,
      message: "Donations Imported Successfully",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};





export const createDonation = async (req, res) => {
  try {
    const {
      donorName,
      email,
      phone,
      amount,
      paymentMethod,
    } = req.body;

    // Check screenshot file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    const donation = await Donation.create({
      donorName,
      email,
      phone,
      amount,
      paymentMethod,
      paymentScreenshot: `/screenshots/${req.file.filename}`,

      // ⭐ VERY IMPORTANT
      source: "manual",
    });

    return res.status(201).json({
      success: true,
      message: "Donation submitted successfully",
      donation,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    console.log(req.query);
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // sirf tab add karo jab value ho
    if (req.query.paymentMethod) {
      query.paymentMethod = req.query.paymentMethod;
    }

    let sort = { createdAt: -1 }; 

if (req.query.sortBy) {
  switch (req.query.sortBy) {
    case "amount-asc":
      sort = { amount: 1 };
      break;

    case "amount-desc":
      sort = { amount: -1 };
      break;

    case "date-asc":
      sort = { createdAt: 1 };
      break;

    case "date-desc":
      sort = { createdAt: -1 };
      break;
  }
}

    const [data, total] = await Promise.all([
      Donation.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit),

      Donation.countDocuments(query),
    ]);

    return res.pagination(data, total, limit, page, 3);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
