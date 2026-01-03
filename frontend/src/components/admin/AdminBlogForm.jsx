import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "jodit/es2021/jodit.min.css";
import {
  useCreateBlogMutation,
   useUpdateBlogMutation,
} from "@/redux/features/adminApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";


const AdminBlogForm = ({ setCloseForm, blog }) => {
  const editor = useRef(null);

  const isEdit = Boolean(blog?._id);

  console.log("0, 1", isEdit);

  console.log(blog);
  
  

  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
   const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();



  const formik = useFormik({
    initialValues: {
      image: null,
      title: blog?.title || "",
      publisher: blog?.publisher || "",
      content: blog?.content || "",
    },

    validationSchema: Yup.object({
      image: isEdit
        ? Yup.mixed().nullable()
        : Yup.mixed().required("Image is required"),

      title: Yup.string().min(5).required("Title is required"),

      publisher: Yup.string()
        .min(3)
        .required("Publisher name is required"),

      content: Yup.string()
        .min(20, "Content must be at least 20 characters")
        .required("Content is required"),
    }),

    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        if (values.image) formData.append("image", values.image);

        if(blog.image) formData.append("oldImage", blog.image)

        formData.append("title", values.title);
        formData.append("publisher", values.publisher);
        formData.append("content", values.content);

        if (isEdit) {
          await updateBlog({
            id: blog._id,
            formData,
          }).unwrap();

        console.log("pp")

          alert("Blog Updated Successfully 🎉");
        } else {
          await createBlog(formData).unwrap();
          alert("Blog Created Successfully 🎉");
        }

        setCloseForm(false);

      } catch (err) {
        console.log(err);
        alert("Something went wrong ❌");
      }
    },
  });

  // Memoize config to prevent re-renders
  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      maxHeight: 400,
    }),
    []
  );

  return (
    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
      bg-[#0f141b] border border-white/10 rounded-2xl shadow-xl">

      <form onSubmit={formik.handleSubmit} className="p-8 text-white">

        {/* CLOSE */}
        <button
          type="button"
          onClick={() => setCloseForm(false)}
          className="absolute top-4 right-4 bg-white text-black 
          w-9 h-9 rounded-full font-bold shadow-xl z-10
          flex items-center justify-center hover:bg-gray-200"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6">
          {isEdit ? "Edit Blog" : "Add New Blog"}
        </h2>

        {/* OLD IMAGE */}
        {isEdit && blog?.image && (
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Current Image</p>

            <img
              src={`${API_URL}/uploads/blogs/${blog.image}`}
              alt="Current blog"
              className="h-36 rounded-lg object-cover"
            />
          </div>
        )}

        {/* IMAGE */}
        <label className="block mb-4">
          <span className="text-gray-300">
            {isEdit ? "Upload New Image (Optional)" : "Upload Image"}
          </span>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.target.files[0])
            }
            className="mt-2 w-full bg-[#111827] border border-white/10 
            rounded-lg p-2 text-gray-300"
          />

          {formik.touched.image && formik.errors.image && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.image}
            </p>
          )}
        </label>

        {/* TITLE */}
        <label className="block mb-4">
          <span className="text-gray-300">Blog Title</span>

          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 w-full bg-[#111827] border border-white/10 
            rounded-lg p-3 text-gray-200 outline-none"
            placeholder="Enter blog title"
          />

          {formik.touched.title && formik.errors.title && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.title}
            </p>
          )}
        </label>

        {/* PUBLISHER */}
        <label className="block mb-4">
          <span className="text-gray-300">Publisher Name</span>

          <input
            type="text"
            name="publisher"
            value={formik.values.publisher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 w-full bg-[#111827] border border-white/10 
            rounded-lg p-3 text-gray-200 outline-none"
            placeholder="Enter publisher name"
          />

          {formik.touched.publisher && formik.errors.publisher && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.publisher}
            </p>
          )}
        </label>

        {/* CONTENT */}
        <label className="block mb-2 text-gray-300">Blog Content</label>

        <div className="bg-white  text-black rounded-lg overflow-hidden mb-2">
          <JoditEditor
            ref={editor}
            value={formik.values.content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => {
              formik.setFieldValue("content", newContent);
              formik.setFieldTouched("content", true);
            }}
          />
        </div>

        {formik.touched.content && formik.errors.content && (
          <p className="text-red-400 text-sm mt-1">
            {formik.errors.content}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={creating || updating}
          className="mt-6 w-full bg-gradient-to-r 
          from-orange-500 to-yellow-400 text-black 
          font-semibold py-3 rounded-full shadow-lg
          hover:from-orange-600 hover:to-yellow-500 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEdit
            ? updating
              ? "Updating..."
              : "Update Blog"
            : creating
            ? "Publishing..."
            : "Publish Blog"}
        </button>

      </form>
    </div>
  );
};

export default AdminBlogForm;