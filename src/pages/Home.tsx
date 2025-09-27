import React from "react";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PortalSection } from "@/components/home/PortalSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FaWhatsapp } from "react-icons/fa";

const Home: React.FC = () => {
  const phoneNumber = "6588769022"; // replace with your WhatsApp number
  const message = "Hello, I want to know more about your Academy!";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // opens in new tab
  };
  return (
    <GradientBG>
      <Navbar />
      <HeroSection />
      <TestimonialSection />
      <PortalSection />
      <AboutSection />
       <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp size={28} />
      </button>
      <Footer />
    </GradientBG>
  );
};

export default Home;