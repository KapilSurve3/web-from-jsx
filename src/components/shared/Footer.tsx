import React from "react";

export const Footer: React.FC = () => (
  <footer className="border-t border-glass-border bg-glass-bg backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-primary" />
          <b>Champ Code Academy</b>
        </div>
        <p className="mt-3 text-sm text-slate-600">Fun, structured coding for kids 9–15. Online. Small classes. Big impact.</p>
      </div>
      <div>
        <div className="font-semibold">Programs</div>
        <ul className="mt-2 text-sm text-slate-600 space-y-1">
          <li>Minecraft Education</li>
          <li>Roblox Studio</li>
          <li>Web Design</li>
          <li>Python</li>
        </ul>
      </div>
      <div>
        <div className="font-semibold">Contact</div>
        <p className="mt-2 text-sm text-slate-600">hello@champcode.academy</p>
      </div>
    </div>
  </footer>
);