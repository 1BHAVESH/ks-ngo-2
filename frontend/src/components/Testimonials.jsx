import { useState } from "react";
// import {  } from "@/redux/features/homePageApi";
import { Card } from "@/components/ui/card";
import { Star, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetStatsQuery,
  useGetTestimonialQuery,
} from "@/redux/features/adminApi";
import { useGetCowsQuery } from "@/redux/features/shubamdevApi";

const API_URL = import.meta.env.VITE_API_URL || " http://localhost:3001/";


export default function Testimonials() {
  const navigate = useNavigate()
  const { data, isLoading } = useGetTestimonialQuery();
  const { data: coeImageData, isLoading: cowImagesLoading } = useGetCowsQuery();
  // safety check (debug ke liye)
  // console.log("Gallery Images:", galleryImages);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <h1>wait..</h1>;

  console.log(data);

  const cowImages = (coeImageData?.data || []).filter((cow) => cow.isActive === true);

  console.log(selectedImage);

  if (isLoading) return <h1 className="text-center">wait...</h1>;

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Donor & Volunteer",
      content:
        "The work Cow Seva NGO does is truly remarkable. I've seen firsthand how they rescue and rehabilitate cows with such dedication. It's an honor to support their mission.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Cow Adopter",
      content:
        "Adopting a cow through this NGO has been the most fulfilling experience. The team keeps me updated regularly and the care they provide is exceptional.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      role: "Veterinarian Partner",
      content:
        "As a veterinarian, I'm impressed by their professional approach to animal welfare. Their facility is well-maintained and the staff is well-trained.",
      rating: 5,
    },
  ];

  // console.log("!!!!!!!!!----------------------!!!!!!!!!!!!", data);

   const teste = data?.testimonials;

   console.log("}}}}}}}}}}}", cowImages);

  return (
    <>
      {/* Testimonials Section */}
      <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[#749e60] md:text-4xl">
              What People Say
            </h2>
            <p className="text-center text-xl">
              Hear from our supporters and volunteers about their experience
              with our mission.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teste.map((testimonial, index) => (
              <Card
                key={testimonial._id}
                className="border-sage bg-[#fbfdf5] p-6 transition-shadow hover:shadow-lg"
              >
                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#fd9800] text-[#f3a20a]"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-4 italic leading-relaxed text-[#65504a]">
                  “{testimonial.message}”
                </p>

                {/* Author */}
                <div className="border-t border-sage pt-4">
                  <p className="font-bold text-[#749e60]">{testimonial.name}</p>
                  <p className="text-sm text-earth">{testimonial.position}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      {/* <section className="py-16 bg-[#dee9d4]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3811] mb-6">
              Join Our Mission Today
            </h2>
            <p className="text-[#65504a] text-lg mb-8 leading-relaxed">
              Whether through donations, volunteering, or adopting a cow, every
              contribution makes a meaningful difference in the lives of these
              gentle beings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#0d3811] hover:bg-[#0d3811]/90 text-[#f8f1e3]"
              >
                <Link to="/donate">Make a Donation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#0d3811] text-[#0d3811] hover:bg-cream bg-transparent"
              >
                <Link to="/contact">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-[#fff6ed]">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-[#1f2d1f]">Our </span>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Witness the beautiful journey of rescued cows and our daily seva
            activities
          </p>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {cowImages?.map((item, i) => (
              <img
                key={i}
                src={`${API_URL}${item.image}`}
                alt="cow"
                className="rounded-2xl object-cover h-44 w-full shadow-sm hover:shadow-lg transition"
                onClick={() =>
                    setSelectedImage({
                      image: item.image,
                      title: item.title,
                    })}
              />
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-10">
            <Button
             onClick={() => navigate("/gallery")}
             className="bg-gradient-to-r from-orange-500 to-yellow-400 cursor-pointer text-white px-6 py-6 text-lg rounded-full shadow-md">
              View Full Gallery →
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute cursor-pointer right-4 top-4 text-white hover:text-sage-light"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-8 w-8" />
                </button>
      
                <div
                  className="flex max-h-[90vh] max-w-5xl flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={`${API_URL}${selectedImage.image}`}
                    alt={selectedImage.title}
                    className="max-h-[80vh] object-contain"
                  />
                  <p className="mt-4 text-center text-lg text-white">
                    {selectedImage.title}
                  </p>
                </div>
              </div>
            )}
    </>
  );
}
