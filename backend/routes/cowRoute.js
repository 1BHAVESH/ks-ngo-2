import express from "express";
import { uploadCow } from "../config/multer/cowMulter.js";
import { createCow, deleteCow, getAllCows, toggleCowStatus, updateCow } from "../controller/cowImageController.js";
import { importExcelDonations } from "../controller/donateController.js";



const router = express.Router();

router.post(
  "/create-cow-image",
  uploadCow.single("image"),
  createCow
);

router.put(
  "/update/:id",
  uploadCow.single("image"),
  updateCow
);

router.get("/all", getAllCows);

router.delete("/cow/:id", deleteCow);

router.patch("/cow/:id/toggle", toggleCowStatus);


export default router;
