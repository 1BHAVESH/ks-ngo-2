import { Card } from "@/components/ui/card";
import { Target, Eye, Award, Heart, BookOpen } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Treating every cow with love and respect",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Providing the highest standard of care",
    },
    {
      icon: Target,
      title: "Dedication",
      description: "Committed to our mission every single day",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Open and honest in all our operations",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#fff7f0] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold  text-center mb-6">
            About <span className="gradient-text">KSNGO</span>
          </h1>
          <p className="text-xl text-[#65504a] text-center max-w-3xl mx-auto">
            Learn about our journey, mission, and the people behind our cow
            welfare initiatives
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold  mb-6">Who We Are</h2>
            <div className="space-y-4 text-[#65504a] leading-relaxed text-lg">
              <p>
                Cow Seva NGO was founded in 2013 by a group of passionate
                individuals who witnessed the plight of abandoned and injured
                cows in rural and urban areas. What started as a small rescue
                operation with just 5 cows has grown into a comprehensive
                sanctuary housing over 500 cows.
              </p>
              <p>
                Over the years, we have expanded our services to include
                state-of-the-art veterinary facilities, nutritious feeding
                programs, and an adoption initiative that has successfully
                connected hundreds of cows with loving caregivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#fff6ed]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Mission */}
            <Card className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <Target className="text-white w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#1a2b1c] mb-2">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-relaxed">
                To rescue, rehabilitate, and provide lifelong care to abandoned
                and injured cows, while raising awareness about cow protection
                in society.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <Heart className="text-white w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#1a2b1c] mb-2">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-relaxed">
                A world where every cow lives with dignity and respect, free
                from suffering, neglect, and cruelty.
              </p>
            </Card>

            {/* Values */}
            <Card className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <Award className="text-white w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#1a2b1c] mb-2">
                Our Values
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Compassion, integrity, transparency, dedication, and respect for
                all living beings guide everything we do.
              </p>
            </Card>

            {/* History */}
            <Card className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <BookOpen className="text-white w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#1a2b1c] mb-2">
                Our History
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Founded in 2014, we've grown from a small shelter to a
                multi-state organization serving 500+ cows annually.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Info */}
      <section className="py-16 bg-[#fbfdf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0d3811] mb-6">
              Founder & Trust
            </h2>
            <div className="space-y-4 text-[#65504a] leading-relaxed text-lg">
              <p>
                <strong className="text-[#0d3811]">Dr. Rajesh Sharma</strong>, a
                veterinarian with over 20 years of experience, founded the Cow
                Seva Trust to address the growing crisis of abandoned cattle.
                His deep reverence for cows and commitment to animal welfare
                inspired him to create a safe haven.
              </p>
              <p>
                The organization is registered under the Indian Trusts Act and
                operates with full transparency. Our board of trustees includes
                veterinarians, animal welfare experts, and community leaders
                dedicated to our cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a2b1c] mb-12">
            The Importance of Cow Protection in India
          </h2>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* BLOCK 1 */}
            <div>
              <h3 className="text-xl font-bold text-[#1a2b1c] mb-3">
                Cultural Significance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                In Indian culture, cows have been revered for thousands of years
                as sacred beings. They represent purity, non-violence, and
                motherhood. The cow is considered a symbol of life and
                sustenance, often referred to as “Gau Mata” or Mother Cow.
              </p>
            </div>

            {/* BLOCK 2 */}
            <div>
              <h3 className="text-xl font-bold text-[#1a2b1c] mb-3">
                Economic Value
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Indigenous cow breeds are essential for organic farming and
                provide valuable products like milk, ghee, and yogurt.
                Protecting these breeds preserves agricultural heritage and
                supports rural livelihoods.
              </p>
            </div>

            {/* BLOCK 3 */}
            <div>
              <h3 className="text-xl font-bold text-[#1a2b1c] mb-3">
                Environmental Benefits
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cows play a vital role in sustainable agriculture. Their dung is
                used as organic fertilizer and fuel, while their presence helps
                maintain ecological balance in rural communities.
              </p>
            </div>

            {/* BLOCK 4 */}
            <div>
              <h3 className="text-xl font-bold text-[#1a2b1c] mb-3">
                Ethical Responsibility
              </h3>
              <p className="text-gray-600 leading-relaxed">
                As sentient beings, cows deserve protection and compassionate
                care. Our duty extends beyond economic value to recognizing
                their right to live with dignity and freedom from suffering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {/* <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0d3811] text-center mb-12">
            Our Values & Ethics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center border-sage">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dee9d4] mb-4">
                    <Icon className="w-8 h-8 text-[#0d3811]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0d3811] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-earth leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Why Cow Protection */}
      {/* <section className="py-16 bg-[#0d3811] text-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why Cow Protection is Important
            </h2>
            <p className="text-sage-light leading-relaxed text-lg">
              Cows hold a sacred place in Indian culture and have been
              companions to humans for thousands of years. Beyond cultural
              significance, they are sentient beings deserving of compassion and
              care. Many cows are abandoned after they stop producing milk or
              become injured, facing starvation and abuse on the streets. Our
              work ensures these gentle creatures receive the dignity, medical
              care, and shelter they deserve. Protecting cows is not just a
              duty—it's an act of compassion that enriches our humanity.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
