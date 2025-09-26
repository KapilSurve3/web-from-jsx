import React from "react";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PortalSection } from "@/components/home/PortalSection";
import { AboutSection } from "@/components/home/AboutSection";

const Home: React.FC = () => {
  return (
    <GradientBG>
      <Navbar />
      <HeroSection />
      <TestimonialSection />
      <PortalSection />
      <AboutSection />
      <Footer />
    </GradientBG>
  );
};

export default Home;