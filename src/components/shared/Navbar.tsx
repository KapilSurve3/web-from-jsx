import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, Users, GraduationCap, School } from "lucide-react";

const NavLink: React.FC<{ to: string; label: string; active?: boolean }> = ({ to, label, active }) => (
  <Link to={to}>
    <Button variant={active ? "default" : "ghost"} className="rounded-2xl">
      {label}
    </Button>
  </Link>
);

const QuickLogin: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link to={to}>
    <Button
      size="sm"
      variant="secondary"
      className="rounded-2xl border border-slate-200/60 hover:border-slate-300 shadow-sm bg-glass-bg backdrop-blur-sm"
    >
      <LogIn className="mr-2 h-4 w-4" /> {label}
    </Button>
  </Link>
);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  return (
    <div className="sticky top-0 z-50 bg-glass-bg backdrop-blur-md border-b border-glass-border">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-3 items-center">
          {/* Left */}
          <div className="flex gap-4">
            <NavLink to="/" label="Home" active={isHome} />
            <NavLink to="/about" label="About" />
          </div>
          
          {/* Center Logo */}
          <Link to="/" className="mx-auto">
            <motion.div whileHover={{ scale: 1.06 }} className="flex items-center gap-2 select-none">
              <div className="h-10 w-10 rounded-2xl shadow-md bg-gradient-primary" />
              <span className="font-extrabold tracking-tight text-xl">
                Champ <span className="text-slate-500">Code</span> Academy
              </span>
            </motion.div>
          </Link>
          
          {/* Right: Quick logins */}
          <div className="flex items-center justify-end gap-2">
            <QuickLogin to="/login?role=parent" label="Parent" />
            <QuickLogin to="/login?role=student" label="Student" />
            <QuickLogin to="/login?role=teacher" label="Teacher" />
          </div>
        </div>
      </div>
    </div>
  );
};