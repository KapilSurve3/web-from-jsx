import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const role = (q.get("role") || "parent") as "parent" | "student" | "teacher";
  const [email, setEmail] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (role === "parent") navigate("/parent");
    if (role === "student") navigate("/student");
    if (role === "teacher") navigate("/teacher");
  }

  return (
    <GradientBG>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-extrabold">Welcome back</h2>
          <p className="mt-2 text-slate-600">Log in to your {role} portal to continue.</p>
          <div className="mt-6 flex gap-2">
            <Badge variant="secondary" className="rounded-xl">Role: {role}</Badge>
            <Badge className="rounded-xl bg-accent text-accent-foreground">Secure</Badge>
          </div>
        </div>
        <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Use your registered email to access the portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="rounded-xl"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </GradientBG>
  );
};

export default Login;