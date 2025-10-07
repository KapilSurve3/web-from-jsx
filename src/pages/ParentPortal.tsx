import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download } from "lucide-react";
import { ChildCard } from "@/components/parent/ChildCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChildData {
  id: string;
  full_name: string;
  email: string | null;
  age: number | null;
  gender: string | null;
  avatar_url: string | null;
  points: number;
  stars: number;
  streak: number;
}

interface ProgramData {
  id: string;
  name: string;
  description: string | null;
}

const ParentPortal: React.FC = () => {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch parent's email
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (!profile) return;

      // Fetch children linked to parent's email
      const { data: childrenData, error: childrenError } = await supabase
        .from('parent_child_relationships')
        .select(`
          child_id,
          children (
            id,
            full_name,
            email,
            age,
            gender,
            avatar_url,
            points,
            stars,
            streak
          )
        `)
        .eq('parent_email', profile.email);

      if (childrenError) throw childrenError;

      // Fetch programs
      const { data: programsData, error: programsError } = await supabase
        .from('programs')
        .select('id, name, description');

      if (programsError) throw programsError;

      setChildren(childrenData?.map(rel => rel.children).filter(Boolean) || []);
      setPrograms(programsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <GradientBG>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <p>Loading...</p>
        </div>
      </GradientBG>
    );
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
                <CardDescription>View profiles and manage courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
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
            {children.length === 0 ? (
              <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card p-6 text-center">
                <p className="text-slate-600">No children found. Please contact the organization to add children to your account.</p>
              </Card>
            ) : (
              children.map((c) => (
                <ChildCard key={c.id} child={c} />
              ))
            )}
          </div>
        </div>
      </div>
    </GradientBG>
  );
};

export default ParentPortal;