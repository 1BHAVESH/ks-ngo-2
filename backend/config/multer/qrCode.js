import multer from "multer";
import path from "path";
import fs from "fs";

// Folder path
const uploadPath = "uploads/qr";

// Create folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `qr_${Date.now()}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {

  // ⭐ IMPORTANT: agar file hi nahi hai → allow silently

  console.log(file)
  if (!file) return cb(null, false);

  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

export const qrUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
