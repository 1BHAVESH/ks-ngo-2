import { Blog } from "../models/BlogModel.js";




export const createBlog = async (req, res) => {
  try {

    // multer validation error
    if (req.fileValidationError) {
      return res.status(400).json({
        message: req.fileValidationError,
      });
    }

    // file required
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const { title, publisher, content } = req.body;

    if (!title || !publisher || !content) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const blog = await Blog.create({
      image: req.file.filename,  // 👉 NOTE
      title,
      publisher,
      content,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("Create Blog Error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// const getImageUrl = (req, filename) => {
//   if (!filename) return null;
//   return `${req.protocol}://${req.get("host")}/uploads/blogs/${filename}`;
// };

export const findBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.json({
      success: true,
      blog: {
        _id: blog._id,
        title: blog.title,
        publisher: blog.publisher,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,

        image:    blog.image
      },
    });

  } catch (error) {
    console.error("Find Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const editBlog = async (req, res) => {
  try {
    const { id } = req.params;

    let blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        message: req.fileValidationError,
      });
    }

    const { title, publisher, content } = req.body;

    if (title) blog.title = title;
    if (publisher) blog.publisher = publisher;
    if (content) blog.content = content;

    // ⭐ NEW IMAGE CASE
    if (req.file) {

      // --- delete old image safely ---
      if (blog.image) {

        console.log("wwwwwwwwww")

        const oldPath = path.join(process.cwd(), "uploads", "blogs", blog.image);

        console.log("yyyyyyyyy", oldPath);
        

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // --- save new filename ---
      blog.image = req.file.filename;
    }

    await blog.save();

    return res.json({
      success: true,
      message: "Blog updated successfully",
      blog: {
        _id: blog._id,
        title: blog.title,
        publisher: blog.publisher,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        image: blog.image,
      },
    });

  } catch (error) {
    console.error("Edit Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    

    return res.json({
      success: true,
      count: blogs.length,
      blogs: blogs
    });

  } catch (error) {
    console.error("Get Blogs Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
