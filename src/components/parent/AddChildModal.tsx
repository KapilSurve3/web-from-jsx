import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Child } from "@/types";

interface AddChildModalProps {
  onClose: () => void;
  onAdd: (child: Child) => void;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(10);
  const [gender, setGender] = useState("Male");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      id: Math.random().toString(36).slice(2),
      name,
      email,
      age,
      gender,
      avatar: "",
      points: 0,
      stars: 0,
      streak: 0,
      progress: 0.0,
      enrolledCourses: [],
      pastCourses: [],
      upcoming: [],
      history: [],
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg rounded-2xl bg-glass-bg backdrop-blur-md border-glass-border shadow-hover">
        <CardHeader>
          <CardTitle>Add Child</CardTitle>
          <CardDescription>Link your child using their email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
              <Label>Child Name</Label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label>Child Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Age</Label>
                <Input 
                  type="number" 
                  min={5} 
                  max={17} 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="tos" />
              <Label htmlFor="tos" className="text-sm text-slate-600">I confirm I am the parent/guardian.</Label>
            </div>
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform"
              >
                Add Child
              </Button>
              <Button type="button" variant="ghost" className="rounded-xl" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};