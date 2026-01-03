import express from "express";
import { createBlog, editBlog, findBlogById, getAllBlogs } from "../controller/blogController.js";
import { deleteOldImage, uploadBlogImage } from "../helper/Storage.js";


const router = express.Router();

router.get("/get", getAllBlogs)

// Create Blog
router.post(
  "/create",
   uploadBlogImage.single("image"),
  createBlog
);

router.put(
  "/update/:id",
  deleteOldImage("oldImage"),
  uploadBlogImage.single("image"),
  editBlog
);

router.get("/:id", findBlogById)

export default router;