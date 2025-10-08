import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, role, loading } = useAuth();
  const isHome = location.pathname === "/";
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    }
  };

  const getRolePath = (role: string) => {
    if (role === 'parent') return '/parent';
    if (role === 'student') return '/student';
    if (role === 'teacher') return '/teacher';
    return '/';
  };
  
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
              <img className="logo" width="80" height="80" src="https://i.ibb.co/tpySpVLh/Logo.png" />
            </motion.div>
          </Link>
          
          {/* Right: User info or Quick logins */}
          <div className="flex items-center justify-end gap-3">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : user && role ? (
              <>
                <Link to={getRolePath(role)}>
                  <Button variant="ghost" className="rounded-2xl gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.email}</span>
                  </Button>
                </Link>
                <Badge variant="secondary" className="rounded-lg capitalize">
                  {role}
                </Badge>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleLogout}
                  className="rounded-2xl border border-slate-200/60 hover:border-slate-300 shadow-sm bg-glass-bg backdrop-blur-sm"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <QuickLogin to="/login?role=parent" label="Parent" />
                <QuickLogin to="/login?role=student" label="Student" />
                <QuickLogin to="/login?role=teacher" label="Teacher" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};