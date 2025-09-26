import React from "react";

interface InfoTileProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export const InfoTile: React.FC<InfoTileProps> = ({ icon, label, value }) => (
  <div className="rounded-2xl border bg-white/60 backdrop-blur-sm p-4 flex items-center gap-3 shadow-card">
    <div className="p-2 rounded-xl bg-gradient-primary text-slate-800">{icon}</div>
    <div>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  </div>
);