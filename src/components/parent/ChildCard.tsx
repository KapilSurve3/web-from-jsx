import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Trophy, Clock3 } from "lucide-react";
import { InfoTile } from "@/components/shared/InfoTile";
import { LessonList } from "@/components/shared/LessonList";
import { supabase } from "@/integrations/supabase/client";

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

interface Lesson {
  id: string;
  title: string;
  lesson_date: string;
  lesson_time: string;
  tutor_name: string | null;
  zoom_link: string | null;
  material_url: string | null;
  recording_url: string | null;
  is_completed: boolean;
}

interface Enrollment {
  programs: { name: string };
  progress: number;
}

interface ChildCardProps {
  child: ChildData;
}

export const ChildCard: React.FC<ChildCardProps> = ({ child }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildData();
  }, [child.id]);

  async function fetchChildData() {
    try {
      // Fetch lessons
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('child_id', child.id)
        .order('lesson_date', { ascending: true });

      // Fetch enrollments
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select('progress, programs(name)')
        .eq('child_id', child.id);

      setLessons(lessonsData || []);
      setEnrollments(enrollmentsData || []);
    } catch (error) {
      console.error('Error fetching child data:', error);
    } finally {
      setLoading(false);
    }
  }

  const upcomingLessons = lessons
    .filter(l => !l.is_completed)
    .map(l => ({
      id: l.id,
      date: new Date(l.lesson_date).toLocaleDateString(),
      time: l.lesson_time,
      title: l.title,
      tutor: l.tutor_name || 'TBA',
      zoom: l.zoom_link || undefined,
      material: l.material_url || undefined,
      recording: undefined,
    }));

  const historicalLessons = lessons
    .filter(l => l.is_completed)
    .map(l => ({
      id: l.id,
      date: new Date(l.lesson_date).toLocaleDateString(),
      time: l.lesson_time,
      title: l.title,
      tutor: l.tutor_name || 'TBA',
      zoom: undefined,
      material: l.material_url || undefined,
      recording: l.recording_url || undefined,
    }));

  const avgProgress = enrollments.length > 0
    ? enrollments.reduce((sum, e) => sum + (Number(e.progress) || 0), 0) / enrollments.length
    : 0;
  const progress = Math.round(avgProgress * 100);
  
  return (
    <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={child.avatar_url || undefined} />
              <AvatarFallback>{child.full_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{child.full_name}</CardTitle>
              <CardDescription>
                {child.age && `Age ${child.age}`} {child.gender && `• ${child.gender}`}
                {enrollments.length > 0 && ` • Enrolled: ${enrollments.map(e => e.programs.name).join(", ")}`}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-accent text-accent-foreground">Points: {child.points}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-slate-500 py-4">Loading...</p>
        ) : (
          <Tabs defaultValue="progress">
            <TabsList className="rounded-xl">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
            </TabsList>
            
            {/* Progress */}
            <TabsContent value="progress" className="space-y-4 pt-3">
              <div>
                <div className="mb-2 text-sm text-slate-600">Course Completion</div>
                <Progress value={progress} className="h-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoTile icon={<Trophy className="h-4 w-4" />} label="Stars" value={child.stars} />
                <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Streak" value={`${child.streak} days`} />
              </div>
            </TabsContent>
            
            {/* Lessons */}
            <TabsContent value="lessons" className="space-y-4 pt-3">
              <div className="text-sm font-semibold">Upcoming Lessons</div>
              {upcomingLessons.length === 0 ? (
                <p className="text-sm text-slate-500">No upcoming lessons</p>
              ) : (
                <LessonList lessons={upcomingLessons} />
              )}
              <Separator />
              <div className="text-sm font-semibold">Historical Lessons</div>
              {historicalLessons.length === 0 ? (
                <p className="text-sm text-slate-500">No historical lessons</p>
              ) : (
                <LessonList lessons={historicalLessons} historical />
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};