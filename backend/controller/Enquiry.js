import Enquiry from "../models/Enquiry.js";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export const enquirySubmit = async (req, res) => {
  const { name: fullName, email, phone, message } = req.body;

  try {
    // ---------------- SAVE IN DATABASE ---------------- //
    const newContact = await Enquiry.create({
      fullName,
      email,
      phone,
      message,
      
    });

    //  SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      message:
        "Your enquiry has been submitted successfully. Our team will contact you soon.",
      data: newContact,
    });

  } catch (error) {
    console.error("Contact Submit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};


export const getAllEnquiry = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Enquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Enquiry.countDocuments()
    ]);

    return res.pagination(data, total, limit, page, 3);

  } catch (error) {
    console.error("Get enquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry",
    });
  }
};



export const deleteEnquiry = async (req, res) => {
  try {

    const { id } = req.params;

    const deleteEnquiry = await Enquiry.findByIdAndDelete(id)

    if(!deleteEnquiry){
      return res.status(404).json({
        message: "Enquiry not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Enquiry deleted successfully",
      success: true
    })
    
  } catch (error) {
    console.log("Deleted Enquiry Error:", error);     
    

    return res.status(500).json({
      message: error.message || "Unable to delete enquiry",
      success: false
    });

    
  }
}

export const getLatestExcel = () => {
  const folder = path.join(process.cwd(), "uploads", "excel");

  const files = fs.readdirSync(folder)
    .filter(f => f.endsWith(".xlsx") || f.endsWith(".xls"))
    .map(f => ({
      name: f,
      time: fs.statSync(path.join(folder, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  if (!files.length) return null;

  return path.join(folder, files[0].name);
};

export const searchExcel = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json({ results: [] });
    }

    const filePath = getLatestExcel();

    if (!filePath) {
      return res.status(404).json({ message: "No Excel file found" });
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const search = q.toLowerCase();

    const results = data.filter(item =>
      (item.fullName?.toLowerCase().includes(search)) ||
      (item.email?.toLowerCase().includes(search)) ||
      (item.phone?.toLowerCase().includes(search)) ||
      (item.message?.toLowerCase().includes(search))
    );

    res.json({ results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};