import express from "express";

import { protect } from "../middleware/auth.js";
import { getExcelEnquiries, importExcelEnquiries } from "../controller/excelEqnuiryController.js";

import { searchExcel } from "../controller/Enquiry.js";
import { uploadExcel } from "../config/multer/excelMulter.js";

const router = express.Router();

router.post("/create-excel-eqnuiry", protect, uploadExcel.single("excelFile"), importExcelEnquiries)
 router.get("/get-excel-enquiry", protect,  getExcelEnquiries);

 router.get("/search", searchExcel);
// router.put("/:id", protect , updateCareer)
// router.delete("/:id", protect , deleteCareer);

export default router; 
