import { useGetAllBlogsQuery } from "@/redux/features/shubamdevApi";
import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";

const Blog = () => {
    const navigate = useNavigate()

  const { data, isLoading } = useGetAllBlogsQuery();

  if (isLoading) return <h1>please wait...</h1>;

  const blogs = data?.blogs || [];

  console.log(blogs)

  return (
    <>
      <section className="bg-[#fff7f0] py-16">
        <div className="container mx-auto px-4">

          <h1 className="mb-6 text-center text-4xl font-bold md:text-5xl">
            Our <span className="gradient-text">Blog</span>
          </h1>

          <p className="mx-auto max-w-4xl text-[#65504a] text-center text-lg">
            Stories, insights, and updates about cow welfare, rescue operations,
            and our seva activities
          </p>

        </div>
      </section>


      <section className="max-w-7xl mx-auto">
        <div className="mt-12 grid md:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white rounded-3xl shadow-md overflow-hidden border"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`${API_URL}/uploads/blogs/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />

                {/* <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  Culture & Heritage
                </span> */}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-bold leading-snug">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                  {blog.publisher}
                </p>

                <div
                  className="text-gray-500 mt-2 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t pt-4">
                  <span>📅 {new Date(blog.createdAt).toDateString()}</span>
                 
                </div>
              </div>

            </div>

          ))}

        </div>
      </section>
    </>
  );
};

export default Blog;
