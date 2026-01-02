import { Gallery } from "../models/Gallery.js";
import fs from "fs";
import { connect } from "http2";
import path from "path";

export const createCow = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const cow = await Gallery.create({
      title: req.body.title,
      image: `/uploads/cows/${req.file.filename}`,
      displayOrder: req.body.displayOrder
    });

    res.status(201).json({
      success: true,
      data: cow
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateCow = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body)

    // find cow
    const cow = await Gallery.findById(id);
    if (!cow) {
      return res.status(404).json({ message: "Cow not found" });
    }

    // ====== HANDLE IMAGE ======
    let imageName = cow.image; // old image by default

    if (req.file) {
      // New image uploaded

      // 1️⃣ delete old image if exists
      const oldPath = path.join("uploads/cows", cow.image);

      if (fs.existsSync(oldPath)) {
        console.log("//////////////////////////////////////////////////")
        fs.unlinkSync(oldPath);
      }

      // 2️⃣ set new image filename
      imageName = `/uploads/cows/${req.file.filename}`;
    }

    // ====== UPDATE DATA ======
    cow.title = req.body.title || cow.title;
    cow.image = imageName;
    cow.displayOrder = req.body.order || cow.displayOrder

    await cow.save();

    return res.json({
      success: true,
      message: "Cow updated successfully",
      cow
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCows = async (req, res) => {
  try {
    const cows = await Gallery.find().sort({ displayOrder: 1 }); // latest first

    res.status(200).json({
      success: true,
      data: cows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteCow = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Cow find karo
    const cow = await Gallery.findById(id);

    if (!cow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
      });
    }

    // 2️⃣ Image ka path banao
    const imagePath = path.join("uploads", "cows", cow.image);

    // 3️⃣ Agar file exist hai → delete karo
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // 4️⃣ DB record delete
    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Cow deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const toggleCowStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ cow find karo
    const cow = await Gallery.findById(id);

    if (!cow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
      });
    }

    // 2️⃣ toggle value
    cow.isActive = !cow.isActive;

    // 3️⃣ save
    await cow.save();

    return res.status(200).json({
      success: true,
      message: "Cow status updated",
      isActive: cow.isActive,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};