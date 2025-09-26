import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Trophy, Clock3 } from "lucide-react";
import { Child } from "@/types";
import { InfoTile } from "@/components/shared/InfoTile";
import { LessonList } from "@/components/shared/LessonList";

interface ChildCardProps {
  child: Child;
}

export const ChildCard: React.FC<ChildCardProps> = ({ child }) => {
  const progress = Math.round(child.progress * 100);
  
  return (
    <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={child.avatar} />
              <AvatarFallback>{child.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{child.name}</CardTitle>
              <CardDescription>
                Age {child.age} • {child.gender} • Enrolled: {child.enrolledCourses.join(", ")}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-accent text-accent-foreground">Points: {child.points}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress">
          <TabsList className="rounded-xl">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
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
            <LessonList lessons={child.upcoming} />
            <Separator />
            <div className="text-sm font-semibold">Historical Lessons</div>
            <LessonList lessons={child.history} historical />
          </TabsContent>
          
          {/* History */}
          <TabsContent value="history" className="space-y-3 pt-3">
            <div className="text-sm text-slate-600">Past Courses</div>
            <ul className="list-disc pl-5 text-sm text-slate-700">
              {child.pastCourses.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};