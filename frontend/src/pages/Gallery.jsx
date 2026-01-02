import { useState } from "react";
import { Card } from "@/components/ui/card";
import { galleryImages } from "@/data/ngo-data";
import { X } from "lucide-react";
import { useGetCowsQuery } from "@/redux/features/shubamdevApi";

const API_URL = import.meta.env.VITE_API_URL || " http://localhost:3001/";

export default function GalleryPage() {
  const { data, isLoading } = useGetCowsQuery();
  // safety check (debug ke liye)
  // console.log("Gallery Images:", galleryImages);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <h1>wait..</h1>;

  console.log(data);

  const cowImages = (data?.data || []).filter(cow => cow.isActive === true);

  console.log(selectedImage);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#fff7f0] py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-[#0d3811] md:text-5xl">
           Our <span className="gradient-text"> Gallery </span>
          </h1>
          <p className="mx-auto max-w-3xl text-center text-xl text-[#65504a]">
            A glimpse into our sanctuary, rescue operations, and the beautiful
            cows we care for
          </p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="bg-background py-16 max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.isArray(cowImages) &&
              cowImages.map((cow) => (
                <Card
                  key={cow._id}
                  className="cursor-pointer overflow-hidden border-sage transition-shadow hover:shadow-lg"
                  onClick={() =>
                    setSelectedImage({
                      image: cow.image,
                      title: cow.title,
                    })
                  }
                >
                  <div className="aspect-square bg-sage-light">
                    <img
                      src={`${API_URL}${cow.image}`}
                      alt={cow.title}
                      className="md:h-[300px] w-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-semibold text-[#0d3811]">
                      {cow.title}
                    </p>
                  </div>
                </Card>
              ))}
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
    </div>
  );
}
