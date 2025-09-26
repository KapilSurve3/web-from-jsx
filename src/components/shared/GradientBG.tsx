import React from "react";

interface GradientBGProps {
  children: React.ReactNode;
}

export const GradientBG: React.FC<GradientBGProps> = ({ children }) => (
  <div
    className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-800"
    style={{
      backgroundImage: `
        radial-gradient(1200px 600px at 20% -20%, rgba(166,225,255,.55), transparent 60%), 
        radial-gradient(900px 500px at 120% 0%, rgba(255,218,121,.35), transparent 60%), 
        linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,252,255,1) 100%)
      `,
    }}
  >
    {children}
  </div>
);