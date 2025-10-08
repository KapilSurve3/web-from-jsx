import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import ParentPortal from "./pages/ParentPortal";
import PaymentPortal from "./pages/PaymentPortal";
import StudentPortal from "./pages/StudentPortal";
import TeacherPortal from "./pages/TeacherPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
          {/* Parent Portal Routes */}
          <Route path="/parent" element={
            <ProtectedRoute allowedRoles={['parent', 'admin']}>
              <ParentPortal />
            </ProtectedRoute>
          } />
          <Route path="/parent/payments" element={
            <ProtectedRoute allowedRoles={['parent', 'admin']}>
              <PaymentPortal />
            </ProtectedRoute>
          } />
          
          {/* Student Portal */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student', 'admin']}>
              <StudentPortal />
            </ProtectedRoute>
          } />
          
          {/* Teacher Portal */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <TeacherPortal />
            </ProtectedRoute>
          } />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
