import express from "express";
import { upload } from "../config/multer/multer.js";
import { createDonation, getAllDonations, importExcelDonations } from "../controller/donateController.js";
import { uploadExcel, uploadExcelForDonains } from "../config/multer/excelMulter.js";


const router = express.Router();

router.post(
  "/donate-send",
  upload.single("paymentScreenshot"),
  createDonation
);

router.get(
  "/get-all-donation",
  getAllDonations
)

router.post("/donatte/import-excel", uploadExcelForDonains.single("excelFile"), importExcelDonations)


export default router;
