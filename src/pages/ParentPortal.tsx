import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download } from "lucide-react";
import { ChildCard } from "@/components/parent/ChildCard";
import { AddChildModal } from "@/components/parent/AddChildModal";
import { Child } from "@/types";
import { initialChildren, programs } from "@/data/mockData";

const ParentPortal: React.FC = () => {
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [showAdd, setShowAdd] = useState(false);

  function addChild(c: Child) {
    setChildren((prev) => [...prev, c]);
    setShowAdd(false);
  }

  return (
    <GradientBG>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb title="Parent Portal" />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Actions */}
          <div className="md:col-span-1 space-y-4">
            <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
              <CardHeader>
                <CardTitle>Children</CardTitle>
                <CardDescription>Manage profiles and courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform" 
                  onClick={() => setShowAdd(true)}
                >
                  + Add Child
                </Button>
                <Link to="/parent/payments">
                  <Button variant="secondary" className="w-full rounded-xl border">
                    <CreditCard className="mr-2 h-4 w-4" /> Payment Portal
                  </Button>
                </Link>
                <Separator />
                <div className="text-sm text-slate-600">Programs & Brochure</div>
                <div className="grid gap-2">
                  {programs.map((p) => (
                    <Button key={p.id} variant="ghost" className="justify-start rounded-xl">
                      <Download className="mr-2 h-4 w-4" /> {p.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Children list */}
          <div className="md:col-span-2 space-y-6">
            {children.map((c) => (
              <ChildCard key={c.id} child={c} />
            ))}
          </div>
        </div>
      </div>

      {showAdd && <AddChildModal onClose={() => setShowAdd(false)} onAdd={addChild} />}
    </GradientBG>
  );
};

export default ParentPortal;