import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";

const PortalCard: React.FC<{ to: string; title: string; desc: string; icon: React.ReactNode }> = ({ to, title, desc, icon }) => (
  <Link to={to}>
    <motion.div whileHover={{ y: -6 }}>
      <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-white/80 transition-colors shadow-card hover:shadow-hover h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <Button variant="ghost" className="rounded-xl">
            Enter portal <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  </Link>
);

export const PortalSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle title="Choose your portal" subtitle="Tailored experiences for parents, students, and teachers" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <PortalCard
          to="/login?role=parent"
          title="Parent Portal"
          desc="Manage children, payments, schedules, and progress."
          icon={<Users className="h-6 w-6 text-slate-800" />}
        />
        <PortalCard
          to="/login?role=student"
          title="Student Portal"
          desc="Track progress, access materials, and earn rewards."
          icon={<Sparkles className="h-6 w-6 text-slate-800" />}
        />
        <PortalCard
          to="/login?role=teacher"
          title="Teacher Portal"
          desc="View classes, students, training, and performance."
          icon={<BookOpen className="h-6 w-6 text-slate-800" />}
        />
      </div>
    </section>
  );
};