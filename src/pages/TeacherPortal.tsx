import React, { useEffect, useState } from "react";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock3, GraduationCap, Trophy } from "lucide-react";
import { InfoTile } from "@/components/shared/InfoTile";
import { LessonList } from "@/components/shared/LessonList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Lesson } from "@/types";

const TeacherPortal: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<any>(null);
  const [upcomingLessons, setUpcomingLessons] = useState<Lesson[]>([]);
  const [pastLessons, setPastLessons] = useState<Lesson[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get teacher profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setTeacher(profile);

      // Fetch lessons where teacher is assigned
      const { data: lessons } = await supabase
        .from('lessons')
        .select(`
          *,
          children (
            full_name
          )
        `)
        .order('lesson_date', { ascending: true });

      const now = new Date();
      const upcoming = lessons?.filter(l => new Date(`${l.lesson_date}T${l.lesson_time}`) >= now) || [];
      const past = lessons?.filter(l => new Date(`${l.lesson_date}T${l.lesson_time}`) < now) || [];

      setUpcomingLessons(upcoming.map(l => ({
        id: l.id,
        date: new Date(l.lesson_date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' }),
        time: new Date(`2000-01-01T${l.lesson_time}`).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit' }),
        title: l.title,
        tutor: l.tutor_name || 'You',
        zoom: l.zoom_link || undefined,
        material: l.material_url || undefined
      })));

      setPastLessons(past.map(l => ({
        id: l.id,
        date: new Date(l.lesson_date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' }),
        time: new Date(`2000-01-01T${l.lesson_time}`).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit' }),
        title: l.title,
        tutor: l.tutor_name || 'You',
        recording: l.recording_url || undefined,
        material: l.material_url || undefined
      })));

      // Get unique students
      const uniqueStudents = lessons?.reduce((acc: any[], lesson: any) => {
        if (lesson.children && !acc.find(s => s.id === lesson.child_id)) {
          acc.push({
            id: lesson.child_id,
            name: lesson.children.full_name,
            program: lesson.title.split(' - ')[0],
            status: 'active',
            feedback: 'Great progress'
          });
        }
        return acc;
      }, []) || [];

      setStudents(uniqueStudents);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      toast({
        title: "Error",
        description: "Failed to load teacher data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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

  if (!teacher) {
    return (
      <GradientBG>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="p-6">
            <CardTitle>No teacher profile found</CardTitle>
            <CardDescription>Please contact support to set up your account.</CardDescription>
          </Card>
        </div>
      </GradientBG>
    );
  }

  const monthLoad = 75;

  return (
    <GradientBG>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb title="Teacher Portal" />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile & KPIs */}
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={teacher.avatar_url} />
                  <AvatarFallback>{teacher.full_name?.[0] || 'T'}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{teacher.full_name}</CardTitle>
                  <CardDescription>{teacher.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Hours (Month)" value={`${pastLessons.length}/${upcomingLessons.length + pastLessons.length}`} />
              <div>
                <div className="mb-2 text-sm text-slate-600">Teaching Load</div>
                <Progress value={monthLoad} className="h-3" />
              </div>
              <InfoTile icon={<GraduationCap className="h-4 w-4" />} label="# Students (Month)" value={students.length} />
              <InfoTile icon={<Trophy className="h-4 w-4" />} label="Training" value="Professional" />
            </CardContent>
          </Card>

          {/* Classes & Admin */}
          <Card className="md:col-span-2 rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Schedule & Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-semibold">Upcoming Lessons</div>
                {upcomingLessons.length > 0 ? (
                  <LessonList lessons={upcomingLessons} />
                ) : (
                  <p className="text-sm text-slate-600 py-2">No upcoming lessons</p>
                )}
              </div>
              <Separator />
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
                  <CardHeader className="pb-2"><CardTitle className="text-base">Leave Requests</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="secondary" className="w-full rounded-xl border">Request Leave</Button>
                    <Button variant="ghost" className="w-full rounded-xl">View Status</Button>
                  </CardContent>
                </Card>
                <Card className="rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
                  <CardHeader className="pb-2"><CardTitle className="text-base">Fines & Penalties</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-slate-600">No fines this month. 🎉</div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
                  <CardHeader className="pb-2"><CardTitle className="text-base">Trials</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-slate-700">Conversion Rate: <b>38%</b> (Sep)</div>
                    <Button variant="ghost" className="rounded-xl">View Report</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students under teacher */}
        <div className="mt-6">
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>My Students</CardTitle>
              <CardDescription>Statuses & feedback</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Program</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.program}</td>
                      <td className="py-2 pr-4">
                        <Badge className="rounded-lg" variant={s.status === "graduated" ? "default" : "secondary"}>{s.status}</Badge>
                      </td>
                      <td className="py-2 pr-4">{s.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div className="mt-6">
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Historical Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              {pastLessons.length > 0 ? (
                <LessonList lessons={pastLessons} historical />
              ) : (
                <p className="text-sm text-slate-600">No historical lessons</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBG>
  );
};

export default TeacherPortal;