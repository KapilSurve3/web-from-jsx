import React from "react";
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
import { demoStudent } from "@/data/mockData";

const StudentPortal: React.FC = () => {
  const student = demoStudent;
  const progress = Math.round(student.progress * 100);

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
              <InfoTile icon={<Trophy className="h-4 w-4" />} label="Stars" value={student.stars} />
              <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Streak" value={`${student.streak} days`} />
              <div>
                <div className="mb-2 text-sm text-slate-600">Course Progress</div>
                <Progress value={progress} className="h-3" />
              </div>
              <Button variant="secondary" className="w-full rounded-xl border">Change Avatar</Button>
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
                <LessonList lessons={student.upcoming} />
              </div>
              <Separator />
              <div>
                <div className="text-sm font-semibold">History</div>
                <LessonList lessons={student.history} historical />
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
              <CardDescription>Describe what you want to build. (Demo UI)</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Textarea 
                placeholder="e.g., Make a Roblox obby with moving platforms and a coin counter..."
                className="rounded-xl"
              />
              <div className="flex gap-2">
                <Button className="rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform">Generate Idea</Button>
                <Button variant="secondary" className="rounded-xl border">
                  Upload Project <UploadCloud className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur-sm p-3 text-sm text-slate-700">
                <b>Preview:</b> <em>AI suggestions will appear here…</em>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBG>
  );
};

export default StudentPortal;