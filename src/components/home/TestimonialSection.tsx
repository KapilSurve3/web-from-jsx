import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { testimonials } from "@/data/mockData";

export const TestimonialSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionTitle title="What our students & parents say" subtitle="Real feedback from our community" />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={i} whileHover={{ y: -6 }}>
            <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <CardDescription>{t.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">"{t.text}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.stars ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};