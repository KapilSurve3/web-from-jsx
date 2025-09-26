import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/shared/SectionTitle";

export const AboutSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle title="About Champ Code Academy" subtitle="Our mission is to teach kids real tech skills—creatively and confidently." />
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
          <CardHeader>
            <CardTitle>What we teach</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5 text-slate-700">
              <li>Game Coding with Roblox Studio & Minecraft Education</li>
              <li>Web Design & Frontend Fundamentals</li>
              <li>Python for Young Learners</li>
              <li>Ethical tech, problem-solving, and creativity</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
          <CardHeader>
            <CardTitle>Why families choose us</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5 text-slate-700">
              <li>Small classes with caring tutors</li>
              <li>Structured curriculum + fun projects</li>
              <li>Progress tracking & parent visibility</li>
              <li>Flexible schedules & online convenience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};