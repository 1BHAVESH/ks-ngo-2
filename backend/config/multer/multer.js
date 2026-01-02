import multer from "multer";
import path from "path";
import fs from "fs";

// ----------- FOLDER PATH -----------
const uploadPath = path.join(process.cwd(), "uploads", "screenshots");

// ----------- CREATE FOLDER IF NOT EXISTS -----------
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ----------- STORAGE CONFIG -----------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// ----------- FILE TYPE FILTER -----------
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG/PNG allowed"), false);
};

// ----------- MULTER EXPORT -----------
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
