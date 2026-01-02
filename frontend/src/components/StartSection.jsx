// components/StatsSection.jsx

import { useGetStatsQuery } from "@/redux/features/adminApi";
import { TrendingUp, UsersRound, CalendarDays, HeartHandshake } from "lucide-react";

export default function StatsSection() {

  const { data, isLoading } = useGetStatsQuery();

  if (isLoading) return <h1 className="text-white">wait...</h1>;

  const stat = data;

  const stats = [
    { 
      number: `${stat.Cows_Rescued}+`, 
      label: "Cows Rescued",
      desc: "Successfully rescued and rehabilitated across India",
      icon: <TrendingUp className="w-7 h-7 text-orange-500" />
    },
    { 
      number: `${stat.Active_Volunteers}+`, 
      label: "Active Volunteers",
      desc: "Dedicated individuals supporting our mission",
      icon: <UsersRound className="w-7 h-7 text-orange-500" />
    },
    { 
      number:`${stat.Years_of_Service}+`, 
      label: "Years of Service",
      desc: "A decade of compassionate cow protection",
      icon: <CalendarDays className="w-7 h-7 text-orange-500" />
    },
    { 
      number:`${stat.Successful_Adoptions}+`, 
      label: "Successful Adoptions",
      desc: "Providing loving homes to rescued cows",
      icon: <HeartHandshake className="w-7 h-7 text-orange-500" />
    },
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        
        <div className="max-w-4xl mx-auto my-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#749e60]">
          Our Impact
        </h2>
        <p className="text-xl text-center">Through dedication and community support, we continue to make a meaningful difference in the lives of cows.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#fff0e4] rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full bg-[#ffe9da] flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-4xl font-bold text-orange-600 mb-2">
                {item.number}
              </h3>

              {/* Label */}
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {item.label}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
