import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../public/brown-and-white-indian-gir-cow-in-sanctuary.jpg"
import img2 from "../../public/peaceful-cow-grazing-in-green-pasture-indian-gaush.jpg"
import img3 from "../../public/elderly-mixed-breed-cow-in-shelter.jpg"
import { useGetBannersQuery } from "@/redux/features/adminApi";

const API_URL=import.meta.env.VITE_API_URL ||" http://localhost:3001/"


export default function HeroImage() {

  const {data, isLoading} = useGetBannersQuery()
  const slides = [
    {
      img: img1,
      title: "Serving & Protecting Cows with Compassion",
      text: "Join us in our mission to rescue, rehabilitate, and provide sanctuary for sacred cows in need."
    },
    {
      img: img2,
      title: "Your Support Saves Innocent Lives",
      text: "Be a part of our journey to care for and protect abandoned cows."
    },
    {
      img: img3,
      title: "Adopt a Cow — Share Your Love",
      text: "Give a cow the life she deserves by adopting and supporting her care."
    },
  ];

  console.log(data)


  if(isLoading) return <h1>please wait..</h1>

  const bannerImages = data?.data?.map((cow) => cow.imageUrl)

  console.log(bannerImages)
  return (
    <section className="relative bg-[#f8f1e3] overflow-hidden">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[420px] md:h-[500px]"
      >
        {bannerImages.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full">
              
              {/* BG IMAGE */}
              <img
                src={`${API_URL}${s}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* CONTENT */}
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
