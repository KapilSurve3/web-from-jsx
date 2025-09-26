import { Child, Program, Plan, PaymentHistory, Teacher, Testimonial } from "@/types";

export const initialChildren: Child[] = [
  {
    id: "c1",
    name: "Aiden Tan",
    email: "aiden@example.com",
    age: 11,
    gender: "Male",
    avatar: "https://i.pravatar.cc/150?img=15",
    enrolledCourses: ["Roblox Level 1"],
    pastCourses: ["Minecraft Level 1"],
    points: 120,
    stars: 14,
    streak: 9,
    progress: 0.45,
    upcoming: [
      { id: "l1", date: "Fri, 27 Sep", time: "5:00 PM", title: "Roblox L1 - Lesson 7", tutor: "Ms. Lim", zoom: "#" },
    ],
    history: [
      { id: "l2", date: "Fri, 20 Sep", time: "5:00 PM", title: "Roblox L1 - Lesson 6", tutor: "Ms. Lim", recording: "#", material: "#" },
    ],
  },
];

export const programs: Program[] = [
  { id: "p1", name: "Minecraft Education – Brochure" },
  { id: "p2", name: "Roblox Studio – Brochure" },
  { id: "p3", name: "Python for Kids – Brochure" },
];

export const plans: Plan[] = [
  { id: "pl1", name: "Monthly", desc: "Billed monthly", price: "$240", features: ["4 classes / month", "Recordings included", "Support"] },
  { id: "pl2", name: "8-Week", desc: "Every 8 weeks", price: "$460", features: ["8 classes", "Priority scheduling", "Support"] },
  { id: "pl3", name: "Semester", desc: "6 months", price: "$1280", features: ["24 classes", "Progress report", "Support"] },
];

export const paymentHistory: PaymentHistory[] = [
  { id: "h1", date: "2025-08-30", child: "Aiden Tan", plan: "Monthly", amount: "$240", status: "Paid" },
  { id: "h2", date: "2025-09-15", child: "Aiden Tan", plan: "Top-up", amount: "$60", status: "Paid" },
  { id: "h3", date: "2025-09-25", child: "Aiden Tan", plan: "Monthly", amount: "$240", status: "Due" },
];

export const demoStudent: Child = {
  id: "s1",
  name: "Maya Koh",
  email: "maya@example.com",
  age: 12,
  gender: "Female",
  avatar: "https://i.pravatar.cc/150?img=36",
  enrolledCourses: ["Minecraft L1"],
  pastCourses: [],
  points: 180,
  stars: 22,
  streak: 12,
  progress: 0.62,
  upcoming: [
    { id: "ul1", date: "Sat, 28 Sep", time: "3:00 PM", title: "Minecraft L1 - Lesson 9", tutor: "Mr. Goh", zoom: "#" },
  ],
  history: [
    { id: "hl1", date: "Sat, 21 Sep", time: "3:00 PM", title: "Minecraft L1 - Lesson 8", tutor: "Mr. Goh", recording: "#", material: "#" },
  ],
};

export const demoTeacher: Teacher = {
  name: "Sarah Lee",
  email: "sarah.lee@champcode.academy",
  avatar: "https://i.pravatar.cc/150?img=47",
  hoursTaught: 52,
  hoursTarget: 60,
  studentsThisMonth: 38,
  trainingLevel: "Professional",
  upcoming: [
    { id: "tu1", date: "Fri, 27 Sep", time: "5:00 PM", title: "Roblox L1 - Lesson 7", zoom: "#", material: "#" },
    { id: "tu2", date: "Sat, 28 Sep", time: "3:00 PM", title: "Minecraft L1 - Lesson 9", zoom: "#", material: "#" },
  ],
  students: [
    { id: "st1", name: "Aiden Tan", program: "Roblox L1", status: "active", feedback: "Asks great questions." },
    { id: "st2", name: "Maya Koh", program: "Minecraft L1", status: "active", feedback: "Very creative builds." },
    { id: "st3", name: "Lucas Ong", program: "Roblox L1", status: "graduated", feedback: "Completed with distinction." },
  ],
  history: [
    { id: "th1", date: "Sun, 22 Sep", time: "1:00 PM", title: "Python Kids - Lesson 4", recording: "#", material: "#" },
  ],
};

export const testimonials: Testimonial[] = [
  { name: "Anna (Parent)", role: "Parent of 10-year-old", text: "My son looks forward to class every week!", stars: 5, avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Ravi (Student)", role: "Student, 12", text: "I built my first Roblox game!", stars: 5, avatar: "https://i.pravatar.cc/150?img=52" },
  { name: "Wei Ling (Parent)", role: "Parent of 13-year-old", text: "Clear progress updates and friendly tutors.", stars: 5, avatar: "https://i.pravatar.cc/150?img=21" },
];