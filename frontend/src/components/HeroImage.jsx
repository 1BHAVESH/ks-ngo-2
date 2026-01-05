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
    <>
      <style>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }
        .hero-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: #f97316;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        @media (max-width: 1023px) {
          .hero-banner-section {
            display: block !important;
          }
        }
      `}</style>
      
      <section className="bg-[#fbfdf5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center hero-banner-section">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Protecting Our <span className="text-orange-500">Sacred Cows</span>
                <br className="hidden sm:block" />
                With Love & Care
              </h1>

              <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                Join us in our mission to rescue, protect, and provide shelter to
                abandoned and injured cows. Every contribution makes a difference in
                their lives.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white rounded-full px-6">
                  Donate Now
                </Button>

                <Link to="/services">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 cursor-pointer"
                  >
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT SLIDER */}
            <div className="relative w-full mt-6 lg:mt-0">
              <div className="w-full">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop={bannerImages && bannerImages.length > 1}
                  className="hero-swiper rounded-3xl"
                  style={{ paddingBottom: '40px' }}
                >
                  {bannerImages?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`${API_URL}${img}`}
                        alt={`Banner ${i + 1}`}
                        className="w-full h-[280px] sm:h-[340px] lg:h-[420px] object-cover rounded-3xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* OVERLAY CARD */}
                {/* <div className="absolute bottom-14 sm:bottom-12 lg:bottom-6 left-4 sm:left-6 bg-white shadow-xl rounded-2xl px-5 py-3 z-10">
                  <p className="text-xl sm:text-2xl font-bold text-orange-500">
                    500+
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">Cows Rescued</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}