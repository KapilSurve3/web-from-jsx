import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  title: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => (
  <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
    <Link to="/" className="hover:underline">Home</Link>
    <ChevronRight className="h-4 w-4" />
    <span>{title}</span>
  </div>
);