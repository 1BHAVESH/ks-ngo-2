import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";
import imgLogo from "../../public/3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useGetGeneralSettingQueryQuery } from "@/redux/features/adminApi";

const API_URL=import.meta.env.VITE_API_URL ||" http://localhost:3001/"


export default function Navbar() {
  const { data, isLoading } = useGetGeneralSettingQueryQuery();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/donate", label: "Donate" },
    { path: "/gallery", label: "Gallery" },
  ];

  if (isLoading) return <h1>wait...</h1>;

  console.log(data);

 

  return (
    <>
      {/* 🔹 TOP STRIP */}
      <div className="bg-[#f54b07] text-[#f3f7ec] text-xs flex justify-between items-center px-3 sm:px-6 md:px-10 lg:px-20 xl:px-[145px] h-12 sm:h-14 sticky top-0 z-50">
        {/* MOBILE CONTACT */}
        <div className="flex md:hidden flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 text-[9px] sm:text-xs py-1">
          <Link
            to={`tel:+91${data?.data?.phone}`}
            className="flex items-center gap-1 hover:text-[#d8f3a0] transition-colors whitespace-nowrap"
          >
            <Phone size={10} />
            <span>+91 {data?.data?.phone}</span>
          </Link>

          <Link
            to={`mailto:${data?.data?.email}`}
            className="flex items-center gap-1 hover:text-[#d8f3a0] transition-colors whitespace-nowrap"
          >
            <Mail size={10} />
            <span>{data?.data?.email}</span>
          </Link>
        </div>

        {/* DESKTOP CONTACT */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm">
          <Link
            to={`tel:+91${data?.data?.phone}`}
            className="flex items-center gap-1.5 hover:text-[#d8f3a0] transition-colors"
          >
            <Phone size={14} />
            <span className="hidden lg:inline">+91 {data?.data?.phone}</span>
            {/* <span className="inline lg:hidden">+91 969...</span> */}
          </Link>

          <Link
            to={`mailto:${data?.data?.email}`}
            className="flex items-center gap-1.5 hover:text-[#d8f3a0] transition-colors"
          >
            <Mail size={14} />
            <span>{data?.data?.email}</span>
          </Link>
        </div>

        {/* SOCIAL */}
        <div className="flex items-center gap-3">
          <Link
           to={data?.data?.facebookUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="hover:text-[#d8f3a0] transition-colors">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-base sm:text-lg"
            />
          </Link>

          <Link
            to={data?.data?.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d8f3a0] transition-colors">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-base sm:text-lg"
            />
          </Link>
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <nav className="bg-[#f7f7f7] border-b border-sage sticky top-12 sm:top-14 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={`${API_URL}/${data.data.logo}`}
                alt="KSNGO Logo"
                className="h-20 object-contain rounded-md"
              />
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-earth font-semibold hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/contact"
                className="bg-[#f54b07] text-[#f8f1e3] px-4 py-2 rounded-md hover:bg-forest/90 transition"
              >
                Contact
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* MOBILE NAV */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-sage">
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-earth hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#0d3811] text-[#f8f1e3] py-2 rounded-md hover:bg-forest/90 transition"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
