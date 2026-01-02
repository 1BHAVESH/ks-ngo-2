import fs from "fs";
import multer from "multer";
import path from "path";

// folder path
const excelPath = path.join(process.cwd(), "uploads", "excel");

const donateExcelPath = path.join(process.cwd(), "uploads", "donate-excel");

// ensure folder exists
if (!fs.existsSync(excelPath)) {
  fs.mkdirSync(excelPath, { recursive: true });
}

// ensure folder exists
if (!fs.existsSync(donateExcelPath)) {
  fs.mkdirSync(donateExcelPath, { recursive: true });
}

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, excelPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// storage config
const storageForDonate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, donateExcelPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// file filter (xlsx/xls only)
const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only Excel files allowed (.xls/.xlsx)"), false);
};

 export const uploadExcel = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

 export const uploadExcelForDonains = multer({
  storage: storageForDonate,
  fileFilter,
 
});
