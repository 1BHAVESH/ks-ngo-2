import express from "express";
import { 

  addTestimonial,
  deleteTestimonial,
  getStats,
  getTestimonials,
  updateStats,
  updateTestimonial
} from "../controller/HomePageController.js";

import multer from "multer";
import path from "path";

const router = express.Router()


// -------------------- ROUTES --------------------

// router.get("/homepage", getHomePage);


router.get("/stats", getStats);
router.put("/stats", updateStats); 
router.get("/testimonials", getTestimonials);
router.post("/testimonials", addTestimonial)
router.put("/testimonials/:id", updateTestimonial)
router.delete("/testimonials/:id", deleteTestimonial)

export default router;
