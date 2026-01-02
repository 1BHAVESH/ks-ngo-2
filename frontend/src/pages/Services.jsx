import { Card } from "@/components/ui/card";
import { helpSections, services } from "@/data/ngo-data";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#fbfdf5]">
      {/* Hero */}
      <section className="bg-[#fff7f0] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold  text-center mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-[#65504a] text-center max-w-3xl mx-auto">
            Comprehensive care and support services dedicated to the welfare and
            protection of cows in need.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative h-[340px] overflow-hidden border-sage transition-all duration-300 hover:shadow-xl"
              >
                {/* DEFAULT CONTENT */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-background transition-opacity duration-300 group-hover:opacity-0">
                  {/* ICON CIRCLE */}
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#dee9d4]">
                    <span className="text-5xl leading-none">
                      {service.icon}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#0d3811]">
                    {service.title}
                  </h3>

                  <p className="text-[#65504a] leading-relaxed max-w-sm">
                    {service.description}
                  </p>
                </div>

                {/* HOVER OVERLAY CONTENT */}
                <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  {/* BACKGROUND IMAGE */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/100" />

                  {/* TEXT + BUTTON */}
                  <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 pointer-events-auto">
                    <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </h3>

                    <p className="mb-4 text-white/90 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      to="/inside"
                      state={{
                        title: service.title,
                        description: service.description,
                        icon: service.icon,
                        heroImage: service.image,
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#0d3811] font-medium py-2 rounded-md hover:bg-white/90"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP SECTION */}
      <section className="py-20 bg-[#fff4ea]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">
            How <span className="gradient-text"> We Help </span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {helpSections.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-[#e8e8e8] p-6 md:p-8"
              >
                <h3 className="text-xl font-bold text-[#0d3811] mb-3">
                  {item.title}
                </h3>

                <p className="text-[#5b443c] leading-relaxed mb-4">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✔</span>
                      <span className="text-[#5b443c]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
