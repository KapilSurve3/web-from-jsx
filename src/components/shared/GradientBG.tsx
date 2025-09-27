import React from "react";

interface GradientBGProps {
  children: React.ReactNode;
}

export const GradientBG: React.FC<GradientBGProps> = ({ children }) => (
  <div
    className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-800"
    style={{
      backgroundImage: `
        radial-gradient(1200px 600px at 20% -20%, rgba(10, 173, 255, 0.76), transparent 60%), 
        radial-gradient(900px 500px at 120% 0%, rgba(40, 87, 243, 0.58), transparent 60%), 
        linear-gradient(180deg, rgba(237, 252, 255, 1) 0%, rgba(132, 214, 252, 1) 100%)
      `,
    }}
  >
    {children}
  </div>
);