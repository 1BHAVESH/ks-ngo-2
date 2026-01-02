import mongoose from "mongoose";

const gallrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true   // "/uploads/cows/filename.jpg"
    },

    // ⭐ NEW — Display Order (sorting ke liye)
    displayOrder: {
      type: Number,
      default: 0,   // lowest number = highest priority
    },

    // ⭐ NEW — Active / Inactive
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("Gallery", gallrySchema);
