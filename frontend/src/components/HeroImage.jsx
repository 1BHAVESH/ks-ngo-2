import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useGetBannersQuery } from "@/redux/features/adminApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";

export default function HeroImage() {
  const { data, isLoading } = useGetBannersQuery();

  if (isLoading) return <h1>Please wait...</h1>;

  const bannerImages = data?.data?.map((cow) => cow.imageUrl);

  return (
    <section className="bg-[#fbfdf5] py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Protecting Our <span className="text-orange-500">Sacred Cows</span>
            <br />
            With Love & Care
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Join us in our mission to rescue, protect, and provide shelter to
            abandoned and injured cows. Every contribution makes a difference in
            their lives.
          </p>

          <div className="mt-6 flex gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white rounded-full px-6">
              Donate Now
            </Button>

            <Link to="/services">
              <Button variant="outline" className="rounded-full px-6 cursor-pointer">
                Our Services
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop
            className="hero-swiper"
          >
            {bannerImages?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${API_URL}${img}`}
                  className="w-full h-[420px] object-cover rounded-4xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* OVERLAY CARD */}
          <div className="absolute bottom-6 left-6 bg-white shadow-xl rounded-2xl px-6 py-4">
            <p className="text-2xl font-bold text-orange-500">500+</p>
            <p className="text-gray-600 text-sm">Cows Rescued</p>
          </div>
        </div>
      </div>
    </section>
  );
}
