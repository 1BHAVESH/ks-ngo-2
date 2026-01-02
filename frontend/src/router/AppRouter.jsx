// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "@/pages/About";
import RealEstateLanding from "@/pages/LandingPage";
import Layout from "@/layout/Layout";
import ContactForm from "@/pages/ContactPage";

import ScrollToTop from "@/components/ScrollTop";

import PrivacyPolicy from "@/pages/PrivacyPolicy";


import Faq from "@/pages/Faq";


import AdminLogin from "@/pages/admin/AdminLogin";
import AdminRegister from "@/pages/admin/AdminRegister";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import BannerManagement from "@/pages/admin/BannerManagement";
import ProjectManagement from "@/pages/admin/ProjectManagement";
import AdminLayout from "@/components/admin/AdminLayout";
import HomePage from "@/components/admin/HomePage";


import PolicyEditor from "@/pages/admin/PrivecyPolicy";
import GeneralSettings from "@/pages/admin/GenralSettings";
import ProfileDropdown from "@/components/admin/AdminProfile";
import Profile from "@/pages/admin/Profile";
import ForgotPassword from "@/pages/admin/ForgotPassword";

import ServicesPage from "@/pages/Services";
import GalleryPage from "@/pages/Gallery";
import Enquiry from "@/pages/admin/Enqiry";
import DonatePage from "@/pages/Donate";
import AdminDonation from "@/pages/admin/AdminDonation";
import CowImageManagment from "@/pages/admin/ProjectManagement";
import BankForm from "@/pages/admin/AdminBank";
import InsideService from "@/pages/services/insideService";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* COMMON LAYOUT WITH NAVBAR */}
        <Route element={<Layout />}>
          <Route path="/" element={<RealEstateLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/inside" element={<InsideService />} />
          <Route path="/gallery" element={<GalleryPage />} />
         
          <Route path="/contact" element={<ContactForm />} />
          
          <Route path="/donate" element={<DonatePage />} />
          
          
          <Route path="/faq" element={<Faq />} />
          
         
         
          </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />

        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="banners" element={<BannerManagement />} />
          <Route path="donations" element={<AdminDonation />} />
          <Route path="home-page" element={<HomePage />} />
          <Route path="cow-image" element={<CowImageManagment />} />
          <Route path="bank" element={<BankForm />} />
        
          <Route path="privacy-policy" element={<PolicyEditor />} />
          <Route path="genral-settings" element={<GeneralSettings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="get-enquiry" element={<Enquiry />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
