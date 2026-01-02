import express from "express";
import { createDonationDetails, getDonationDetails, updateDonationDetails } from "../controller/banController.js";
import { qrUpload } from "../config/multer/qrCode.js";


const router = express.Router();

// Public
 router.get("/", getDonationDetails);

// Admin
// router.get("/all", getAllDonationDetails);
router.post("/create-bank-detail", qrUpload.single("qrCode"), createDonationDetails);
 router.put("/edit-bank-info/:id", qrUpload.single("qrCode"), updateDonationDetails);
// router.delete("/:id", deleteDonationDetails);
// router.put("/:id/activate", setActiveDonationDetails);

export default router;
