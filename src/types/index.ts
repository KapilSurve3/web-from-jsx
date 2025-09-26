export interface Lesson {
  id: string;
  date: string;
  time: string;
  title: string;
  tutor?: string;
  zoom?: string;
  material?: string;
  recording?: string;
}

export interface Child {
  id: string;
  name: string;
  email?: string;
  age: number;
  gender: string;
  avatar?: string;
  enrolledCourses: string[];
  pastCourses: string[];
  points: number;
  stars: number;
  streak: number; // days
  progress: number; // 0..1
  upcoming: Lesson[];
  history: Lesson[];
}

export interface Program {
  id: string;
  name: string;
}

export interface Plan {
  id: string;
  name: string;
  desc: string;
  price: string;
  features: string[];
}

export interface PaymentHistory {
  id: string;
  date: string;
  child: string;
  plan: string;
  amount: string;
  status: string;
}

export interface Teacher {
  name: string;
  email: string;
  avatar: string;
  hoursTaught: number;
  hoursTarget: number;
  studentsThisMonth: number;
  trainingLevel: string;
  upcoming: Lesson[];
  students: {
    id: string;
    name: string;
    program: string;
    status: string;
    feedback: string;
  }[];
  history: Lesson[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar: string;
}