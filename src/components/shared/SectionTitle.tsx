import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold">{title}</h2>
    {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
  </div>
);