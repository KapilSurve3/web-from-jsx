import React, { useEffect, useState } from "react";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Trophy, Clock3, UploadCloud } from "lucide-react";
import { InfoTile } from "@/components/shared/InfoTile";
import { LessonList } from "@/components/shared/LessonList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Lesson } from "@/types";

const StudentPortal: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [upcomingLessons, setUpcomingLessons] = useState<Lesson[]>([]);
  const [pastLessons, setPastLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get student profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Find child associated with this user's email
      const { data: childData } = await supabase
        .from('children')
        .select('*')
        .eq('email', profile?.email)
        .single();

      if (childData) {
        setStudent(childData);

        // Fetch lessons
        const { data: lessons } = await supabase
          .from('lessons')
          .select('*')
          .eq('child_id', childData.id)
          .order('lesson_date', { ascending: true });

        const now = new Date();
        const upcoming = lessons?.filter(l => new Date(`${l.lesson_date}T${l.lesson_time}`) >= now) || [];
        const past = lessons?.filter(l => new Date(`${l.lesson_date}T${l.lesson_time}`) < now) || [];

        setUpcomingLessons(upcoming.map(l => ({
          id: l.id,
          date: new Date(l.lesson_date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' }),
          time: new Date(`2000-01-01T${l.lesson_time}`).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit' }),
          title: l.title,
          tutor: l.tutor_name || 'TBA',
          zoom: l.zoom_link || undefined,
          material: l.material_url || undefined
        })));

        setPastLessons(past.map(l => ({
          id: l.id,
          date: new Date(l.lesson_date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' }),
          time: new Date(`2000-01-01T${l.lesson_time}`).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit' }),
          title: l.title,
          tutor: l.tutor_name || 'TBA',
          recording: l.recording_url || undefined,
          material: l.material_url || undefined
        })));

        // Get enrollment progress
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('progress')
          .eq('child_id', childData.id)
          .eq('status', 'active');

        if (enrollments && enrollments.length > 0) {
          const avgProgress = enrollments.reduce((sum, e) => sum + Number(e.progress), 0) / enrollments.length;
          setProgress(Math.round(avgProgress));
        }
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      toast({
        title: "Error",
        description: "Failed to load student data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateIdea = async () => {
    if (!aiPrompt.trim()) return;
    
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-code-idea', {
        body: { prompt: aiPrompt }
      });

      if (error) throw error;
      setAiSuggestion(data.suggestion);
    } catch (error) {
      console.error('Error generating idea:', error);
      toast({
        title: "Error",
        description: "Failed to generate idea",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <GradientBG>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </GradientBG>
    );
  }

  if (!student) {
    return (
      <GradientBG>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="p-6">
            <CardTitle>No student profile found</CardTitle>
            <CardDescription>Please contact support to set up your account.</CardDescription>
          </Card>
        </div>
      </GradientBG>
    );
  }

  return (
    <GradientBG>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb title="Student Portal" />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile */}
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>{student.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoTile icon={<Trophy className="h-4 w-4" />} label="Stars" value={student.stars || 0} />
              <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Streak" value={`${student.streak || 0} days`} />
              <div>
                <div className="mb-2 text-sm text-slate-600">Course Progress</div>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Lessons & Materials */}
          <Card className="md:col-span-2 rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-semibold">Upcoming</div>
                {upcomingLessons.length > 0 ? (
                  <LessonList lessons={upcomingLessons} />
                ) : (
                  <p className="text-sm text-slate-600 py-2">No upcoming lessons</p>
                )}
              </div>
              <Separator />
              <div>
                <div className="text-sm font-semibold">History</div>
                {pastLessons.length > 0 ? (
                  <LessonList lessons={pastLessons} historical />
                ) : (
                  <p className="text-sm text-slate-600 py-2">No past lessons</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards & AI */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Redeemable Rewards</CardTitle>
              <CardDescription>Use points to customize your avatar</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="ghost" className="justify-start rounded-xl">🎩 Fancy Hat – 50 pts</Button>
              <Button variant="ghost" className="justify-start rounded-xl">🕶️ Cool Shades – 40 pts</Button>
              <Button variant="ghost" className="justify-start rounded-xl">🎒 Backpack – 30 pts</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>AI Code Builder</CardTitle>
              <CardDescription>Describe what you want to build and get AI suggestions!</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Textarea 
                placeholder="e.g., Make a Roblox obby with moving platforms and a coin counter..."
                className="rounded-xl"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerateIdea}
                  disabled={generating || !aiPrompt.trim()}
                  className="rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform"
                >
                  {generating ? "Generating..." : "Generate Idea"}
                </Button>
              </div>
              {aiSuggestion && (
                <div className="rounded-xl border bg-white/60 backdrop-blur-sm p-4 text-sm text-slate-700 whitespace-pre-wrap">
                  {aiSuggestion}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBG>
  );
};

export default StudentPortal;