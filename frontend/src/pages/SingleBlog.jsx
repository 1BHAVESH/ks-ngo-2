import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGettBlogByIdQuery } from "@/redux/features/shubamdevApi";
import { Calendar, User, Clock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";


const SingleBlog = () => {
    const navigate = useNavigate()
  const { id } = useParams();

  const { data, isLoading } = useGettBlogByIdQuery(id);

  if (isLoading) return <h1 className="text-center py-10">Loading...</h1>;

  const blog = data?.blog || data;

  console.log("===============", blog)

  return (
    <div className="bg-white">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          to="/blog"
          className="inline-flex gap-2 items-center border px-4 py-2 rounded-full"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden">

        <img
          src={`${API_URL}/uploads/blogs/${blog.image}`}
          className="w-full h-[420px] object-cover"
          alt=""
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* TEXT */}
        <div className="absolute bottom-6 left-6">

          {/* BADGE */}
          <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
            {blog?.category || "Blog"}
          </span>

          {/* TITLE */}
          <h1 className="text-white text-4xl font-bold max-w-3xl mt-3">
            {blog?.title}
          </h1>
        </div>
      </div>

      {/* META INFO */}
      <div className="max-w-6xl mx-auto px-4 mt-6 text-gray-600 flex gap-6 items-center">

        <span className="flex items-center gap-2">
          <User size={18} /> {blog?.publisher || "Admin"}
        </span>

        <span className="flex items-center gap-2">
          <Calendar size={18} /> {new Date(blog?.createdAt).toDateString()}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={18} /> {blog?.readTime || "5 min read"}
        </span>

      </div>

      <hr className="max-w-6xl mx-auto my-6" />

      {/* BLOG CONTENT */}
      <div
        className="max-w-6xl mx-auto px-4 text-lg leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      />

      {/* CTA SECTION */}
      <div className="max-w-5xl mx-auto my-16 bg-orange-50 rounded-2xl p-10 text-center">

        <h2 className="text-2xl font-bold mb-3">
          Support Our Cause
        </h2>

        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Your contribution helps us rescue and care for more cows in need.
          Join us in making a difference.
        </p>

        <button 
        onClick={() => navigate("/donate")}
        className="bg-gradient-to-r cursor-pointer from-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold">
          Donate Now
        </button>

      </div>

    </div>
  );
};

export default SingleBlog;
