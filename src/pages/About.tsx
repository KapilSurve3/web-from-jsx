import React from "react";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/shared/SectionTitle";

const About: React.FC = () => (
  <GradientBG>
    <Navbar />
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionTitle title="About Us" subtitle="We turn curiosity into capability." />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700">
            To teach kids tech skills in a fun and engaging way so they can thrive in a digital world.
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700">
            To provide quality education that empowers students and equips them with future‑ready skills by cultivating curiosity and creativity.
          </CardContent>
        </Card>
      </div>
    </div>
  </GradientBG>
);

export default About;