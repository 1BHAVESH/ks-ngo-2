import React from 'react';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useGetGeneralSettingQueryQuery } from '@/redux/features/adminApi';

const Footer = () => {
    const { data, isLoading } = useGetGeneralSettingQueryQuery();
  
  const Link = ({ to, children, className = "" }) => (
    <a href={to} className={className}>{children}</a>
  );

  return (
    <footer className="relative overflow-hidden bg-[#f5f1e8]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-green-100">
                <Heart className="w-7 h-7 text-green-700" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">KSNGO</h3>
                <p className="text-green-700 text-sm font-medium">Cow Seva</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm max-w-md">
              Dedicated to protecting and caring for sacred cows with compassion and commitment. Our mission is to
              provide shelter, medical care, and love to abandoned and injured cows.
            </p>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 w-fit shadow-sm border border-green-100">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-700" fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Serving since</p>
                <p className="font-bold text-gray-800 text-lg">2013</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded-full"></div>
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/cows", label: "Our Cows" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/donate", label: "Donate Now" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-gray-600 hover:text-green-700 hover:translate-x-1 transition-all text-sm group flex items-center gap-2"
                >
                  <span className="text-green-600 group-hover:text-green-700">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded-full"></div>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-green-100">
                  <MapPin className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-600 leading-relaxed">123 Gaushala Road, Vrindavan, UP 281121</span>
              </div>
              <Link  to={`tel:+91${data?.data?.phone}`} className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm border border-green-100">
                  <Phone className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-600">+91 {data?.data?.phone}</span>
              </Link>
              <Link  to={`mailto:${data?.data?.email}`} className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm border border-green-100">
                  <Mail className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-600">{data?.data?.email}</span>
              </Link>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3 font-semibold">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Youtube, label: "YouTube" }
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 bg-white hover:bg-green-600 border border-green-100 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 group shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-green-700 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} KSNGO. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
              <span>for sacred cows</span>
            </div>
            <div className="flex gap-6 text-xs">
              <Link to="/privacy" className="hover:text-green-700 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-green-700 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;