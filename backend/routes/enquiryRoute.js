import express from "express";
import { enquirySubmit, deleteEnquiry, getAllEnquiry,  } from "../controller/Enquiry.js";

const router = express.Router();

router.post("/send-enquiry", enquirySubmit);
router.get("/", getAllEnquiry)
router.delete("/:id", deleteEnquiry)

export default router;
