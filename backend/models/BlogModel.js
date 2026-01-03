import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    image: {
      type: String, // store image URL
      required: true,
    },

    title: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },

    publisher: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    content: {
      type: String,   // Jodit returns HTML string
      required: true,
      minlength: 20,
    },

    // OPTIONAL but recommended
    views: {
      type: Number,
      default: 0,
    },

    // for SEO slug
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Blog =  mongoose.model("Blog", blogSchema);


blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});