import React from "react";
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
import { demoTeacher } from "@/data/mockData";

const TeacherPortal: React.FC = () => {
  const t = demoTeacher;
  const monthLoad = Math.min(100, Math.round((t.hoursTaught / t.hoursTarget) * 100));

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
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  <CardDescription>{t.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Hours (Month)" value={`${t.hoursTaught}/${t.hoursTarget}`} />
              <div>
                <div className="mb-2 text-sm text-slate-600">Teaching Load</div>
                <Progress value={monthLoad} className="h-3" />
              </div>
              <InfoTile icon={<GraduationCap className="h-4 w-4" />} label="# Students (Month)" value={t.studentsThisMonth} />
              <InfoTile icon={<Trophy className="h-4 w-4" />} label="Training" value={t.trainingLevel} />
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
                <LessonList lessons={t.upcoming} />
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
                  {t.students.map((s) => (
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
              <LessonList lessons={t.history} historical />
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBG>
  );
};

export default TeacherPortal;