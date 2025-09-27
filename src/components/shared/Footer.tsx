import React from "react";

export const Footer: React.FC = () => (
  <footer className="border-t border-glass-border bg-glass-bg backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <img className="logo" width="80" height="80" src="https://i.ibb.co/tpySpVLh/Logo.png" />
          
        </div>
        <p className="mt-3 text-sm text-slate-600">Fun, structured coding for kids above 7. Online. Small classes. Big impact.</p>
      </div>
      <div>
        <div className="font-semibold">Programs</div>
        <ul className="mt-2 text-sm text-slate-600 space-y-1">
          <li>Minecraft Level 1</li>
          <li>Minecraft Level 2</li>
          <li>Roblox Level 1</li>
          <li>Roblox Level 2</li>
          <li>Web Design</li>
          <li>Python</li>
        </ul>
      </div>
      <div>
        <div className="font-semibold">Contact</div>
        <p className="mt-2 text-sm text-slate-600">admin@champcodeacademy.com</p>
      </div>
    </div>
  </footer>
);