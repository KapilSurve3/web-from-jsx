import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, School, MousePointer2 } from "lucide-react";

const CTA: React.FC<{ to: string; label: string; icon?: React.ReactNode }> = ({ to, label, icon }) => (
  <Link to={to}>
    <Button
      size="lg"
      className="rounded-2xl shadow-card hover:shadow-hover transition-all bg-gradient-hero text-slate-800 hover:scale-105"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  </Link>
);

const HeroGallery: React.FC = () => (
  <div className="grid gap-4">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-3xl overflow-hidden shadow-card border border-glass-border bg-glass-bg backdrop-blur-sm"
    >
      <iframe
        width="100%"
        height="288" // h-72 = 18rem = 288px
        src="https://www.youtube.com/embed/B0IAUWyOatQ"
        title="Kids coding"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full"
      ></iframe>
    </motion.div>
    <div className="grid grid-cols-2 gap-4">
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-card border border-glass-border bg-glass-bg backdrop-blur-sm">
        <img
          alt="Minecraft lesson"
          src="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=1200&auto=format&fit=crop"
          className="h-40 w-full object-cover"
        />
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-card border border-glass-border bg-glass-bg backdrop-blur-sm">
        <img
          alt="Roblox project"
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
          className="h-40 w-full object-cover"
        />
      </motion.div>
    </div>
  </div>
);

export const HeroSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Coding for Kids
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-hero">
              Age 7 & above
            </span>
          </motion.h1>
          <p className="mt-5 text-lg text-slate-600">
            Learn to build games in <b>Minecraft</b> & <b>Roblox</b>, design websites, and explore Python—guided by expert tutors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTA to="/login?role=parent" label="Parent Login" icon={<Users className="h-4 w-4" />} />
            <CTA to="/login?role=student" label="Student Login" icon={<GraduationCap className="h-4 w-4" />} />
            <CTA to="/login?role=teacher" label="Teacher Login" icon={<School className="h-4 w-4" />} />
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <MousePointer2 className="h-4 w-4" /> Hover the cards & buttons — playful interactions everywhere!
          </div>
        </div>

        <HeroGallery />
      </div>
    </section>
  );
};