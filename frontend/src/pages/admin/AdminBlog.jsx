import AdminBlogForm from "@/components/admin/AdminBlogForm";
import { useGetAllBlogsQuery } from "@/redux/features/adminApi";
import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";

const AdminBlog = () => {
  const [openForm, setOpenForm] = useState(false);
  const [blog, setBlog] = useState("");

  const [edit, setEdit] = useState(false);

  const { data, isLoading } = useGetAllBlogsQuery();

  if (isLoading)
    return <h1 className="text-white text-center py-10">Please Wait...</h1>;

  const blogs = data?.blogs || [];

  return (
    <div className="min-h-screen bg-[#0b0f14] p-8">
      {/* TOP BAR */}
      <div
        className="max-w-6xl mx-auto flex justify-between items-center
        bg-white/5 border border-white/10 backdrop-blur-xl
        rounded-2xl px-6 py-4 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-white">Admin Blog</h2>

        <button
          onClick={() => setOpenForm(true)}
          className="bg-gradient-to-r from-orange-500 to-yellow-400 
          text-black font-medium px-6 py-2 rounded-full shadow"
        >
          Add A Blog
        </button>
      </div>

      {/* BLOG LIST */}
      <div className="max-w-6xl mx-auto mt-10">
        <p className="text-gray-300 mb-6">Manage blogs here…</p>

        <div className="space-y-5">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#101620] border border-white/10 rounded-2xl 
              p-5 flex gap-4 items-center"
            >
              {/* IMAGE */}
              <img
                src={`${API_URL}/uploads/blogs/${blog.image}`}
                className="w-28 h-20 object-cover rounded-xl"
                alt=""
              />

              {/* TEXT */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm">{blog.publisher}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOpenForm(true);
                    setBlog(blog);
                  }}
                  className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => alert("Delete Clicked")}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {openForm && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm 
          flex justify-center items-center z-50"
        >
          <AdminBlogForm blog={blog} setCloseForm={setOpenForm} />
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
