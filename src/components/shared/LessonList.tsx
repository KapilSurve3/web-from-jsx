import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Video, FileText, Link2 } from "lucide-react";
import { Lesson } from "@/types";

interface LessonListProps {
  lessons: Lesson[];
  historical?: boolean;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, historical }) => (
  <div className="space-y-3">
    {lessons.map((l) => (
      <div key={l.id} className="rounded-xl border bg-white/60 backdrop-blur-sm p-3 flex flex-wrap items-center gap-3 shadow-card">
        <Badge variant="outline" className="rounded-lg">
          <CalendarDays className="mr-1 h-3.5 w-3.5" /> {l.date} {l.time}
        </Badge>
        <div className="font-medium">{l.title}</div>
        <div className="text-sm text-slate-600">Tutor: {l.tutor}</div>
        <div className="ml-auto flex items-center gap-2">
          {historical && l.recording && (
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-lg"
              asChild
            >
              <a href={l.recording} target="_blank" rel="noopener noreferrer">
                <Video className="mr-2 h-4 w-4" /> Recording
              </a>
            </Button>
          )}
          {l.material && (
            <Button 
              size="sm" 
              variant="secondary" 
              className="rounded-lg border"
              asChild
            >
              <a href={l.material} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Materials
              </a>
            </Button>
          )}
          {l.zoom && (
            <Button 
              size="sm" 
              className="rounded-lg bg-gradient-hero text-slate-800 hover:scale-105 transition-transform"
              asChild
            >
              <a href={l.zoom} target="_blank" rel="noopener noreferrer">
                <Link2 className="mr-2 h-4 w-4" /> Zoom
              </a>
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
);