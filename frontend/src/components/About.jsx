// import { useGetHomePageQuery } from "@/redux/features/homePageApi";
import {
  ArrowRight,
  Heart,
  HomeIcon,
  Shield,
  StethoscopeIcon,
  Users,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function About() {
  // const { data, isLoading } = useGetHomePageQuery();

  // if (isLoading) return <h1>wait...</h1>;

  const services = [
    {
      icon: Heart,
      title: "Cow Rescue",
      description:
        "Saving abandoned and injured cows from dangerous situations across the region.",
      image: "/cow-rescue-operation-team-helping-injured-cow.jpg",
      href: "/services#rescue",
    },
    {
      icon: StethoscopeIcon,
      title: "Medical Care",
      description:
        "Providing comprehensive veterinary treatment and rehabilitation services.",
      image: "/veterinarian-treating-cow-medical-care.jpg",
      href: "/services#medical",
    },
    {
      icon: HomeIcon,
      title: "Shelter & Food",
      description:
        "Offering a safe haven with nutritious meals and comfortable living conditions.",
      image: "/cows-eating-in-shelter-gaushala-feeding.jpg",
      href: "/services#shelter",
    },
    {
      icon: Users,
      title: "Adoption Program",
      description:
        "Connecting compassionate individuals with cows needing lifelong care.",
      image: "/happy-family-with-adopted-cow-bonding.jpg",
      href: "/adopt",
    },
  ];

  return (
    <>
      {/* About Section */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="container mx-auto px-4">
          {/* HEADING */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4d8352] mb-6">
              About Our Mission
            </h2>
            <p className="text-[#65504a] text-xl leading-relaxed">
              For over a decade, our NGO has been dedicated to the protection
              and welfare of sacred cows. We provide rescue, medical care,
              nutritious food, and safe shelter to abandoned and injured cows.
            </p>
          </div>

          {/* 3 CARDS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Mission */}
            <div className="text-center">
              <div className="w-18 h-18 text-white  mx-auto mb-4 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center">
                <Heart width={32} height={32}/>
              </div>
              <h3 className="text-2xl font-bold text-[#2f5233] mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                To rescue, rehabilitate, and provide lifelong care to abandoned
                and injured cows across India.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="w-18 h-18 text-white  mx-auto mb-4 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center">
                <Shield width={32} height={32}/>
              </div>
              <h3 className="text-2xl  font-bold text-[#2f5233] mb-3">
                Our Vision
              </h3>
              <p className=" text-gray-600 text-xl leading-relaxed">
                A world where every cow lives with dignity, free from suffering
                and neglect.
              </p>
            </div>

            {/* Values */}
            <div className="text-center">
              <div className="w-18 h-18 text-white mx-auto mb-4 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center">
                <Users width={32} height={32}/>
              </div>
              <h3 className="text-2xl font-bold text-[#2f5233] mb-3">
                Our Values
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Compassion, dedication, transparency, and respect for all living
                beings guide our every action.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button className="bg-transparent cursor-pointer text-black border-2 border-black rounded-2xl hover:bg-amber-500 hover:text-white">Read More About Us</Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-[#fff7f0]">
        <div className="container mx-auto px-4 mb-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-12">
            Our Key Services
          </h2>

          <p className="text-muted-foreground text-xl text-center leading-relaxed">We provide comprehensive care and support services for cows in need through our dedicated programs.</p>

          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Card className="group relative h-[320px] overflow-hidden border-sage transition-all duration-300 hover:shadow-xl">
                  {/* DEFAULT STATE */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-background transition-opacity duration-300 group-hover:opacity-0">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0a660]">
                      <service.icon className="h-8 w-8 text-[#ffffff]" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-[#528a3c]">
                      {service.title}
                    </h3>

                    <p className="text-earth leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* HOVER STATE */}
                  <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    {/* IMAGE */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* GREEN OVERLAY (IMPORTANT) */}
                    <div className="absolute inset-0 bg-[#0d3811]/50" />

                    {/* CONTENT */}
                    <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 pointer-events-auto">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {service.title}
                      </h3>

                      <p className="mb-4 text-sm leading-relaxed text-white/90">
                        {service.description}
                      </p>

                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-white text-forest hover:bg-white/90"
                      >
                        <Link to={service.href}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
