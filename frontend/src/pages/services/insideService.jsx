import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const InsideService = () => {
    const navigate = useNavigate()
  const { state } = useLocation();
  const { title, description, icon, heroImage } = state || {};

  return (
    <div className="min-h-screen bg-[#fbfdf5]">
      {/* ===== TOP BAR ===== */}
      <div className="bg-[#fff7f0]">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>
        </div>

        {/* ===== HEADER ===== */}
        <div className="text-center py-6">
          {icon && <p className="mx-auto text-6xl leading-none">{icon}</p>}

          <h1 className="text-4xl font-bold mt-4">{title}</h1>

          <p className="max-w-3xl text-lg mx-auto mt-3 text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* ===== HERO IMAGE ===== */}
      {heroImage && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <img
            src={heroImage}
            alt={title}
            className="rounded-xl shadow w-full  h-[500px]"
          />
        </div>
      )}

      {/* ===== ABOUT + FEATURES ===== */}
      <div className="w-full px-4 py-12 bg-[#fff]">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* LEFT — ABOUT */}
          <div>
            <h2 className="font-bold text-3xl mb-3">About This Service</h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our dedicated rescue team operates 24/7 to respond to distress
              calls about abandoned, injured, or mistreated cows. We have a
              fleet of specialized rescue vehicles equipped with medical
              supplies and trained personnel who can handle emergency
              situations. Once rescued, cows are immediately transported to our
              shelter where they receive comprehensive medical evaluation and
              treatment.
            </p>
          </div>

          {/* RIGHT — KEY FEATURES */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h3 className="font-bold text-xl mb-6">Key Features</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">24/7 Emergency Response</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">
                  Specialized Rescue Vehicles
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">Trained Rescue Personnel</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">
                  Immediate Medical Attention
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">Safe Transportation</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-300 rounded-full h-6 w-6">
                  {" "}
                  <span className="text-green-500">✔</span>
                </div>
                <span className="text-gray-700">Post-Rescue Care</span>
              </li>
            </ul>

            {/* Divider */}
            <div className="my-6 border-t"></div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-full cursor-pointer" onClick={()=> navigate("/donate")}>
                Support This Service
              </button>

              <button className="w-full border cursor-pointer rounded-full py-3 font-medium" onClick={()=> navigate("/donate")}>
                Get More Information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER CTA ===== */}
      <div className="text-center py-12 bg-[#fff7f0]">
        <h2 className="font-bold mb-6 text-4xl">Help Us Continue This Service</h2>

        <p className="text-gray-600 text-lg mb-6">
          Your support enables us to provide better care and expand our services to help more cows in need.
        </p>

        <button className="px-5 py-2 bg-orange-500 cursor-pointer text-white rounded-lg mx-2" onClick={()=> window.location.href="/donate"}>
          Make a Donation
        </button>

        <button className="px-5 py-2 cursor-pointer border rounded-lg mx-2" onClick={()=> window.location.href="/services"}>
          View All Services
        </button>
      </div>
    </div>
  );
};

export default InsideService;
