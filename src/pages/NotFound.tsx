import React from "react";
import { Link } from "react-router-dom";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => (
  <GradientBG>
    <Navbar />
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="text-4xl font-extrabold">Page not found</h2>
      <p className="mt-2 text-slate-600">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button className="mt-6 rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform">Go Home</Button>
      </Link>
    </div>
  </GradientBG>
);

export default NotFound;