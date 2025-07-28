"use client";

import { useState } from "react";
import { StudentForm } from "@/components/student-form";
import { StudentList } from "@/components/student-list";
import { type Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, Cpu } from "lucide-react";

// Mock data to start with
const initialStudents: Student[] = [
  {
    name: "Jane Doe",
    dateOfJoining: "2023-09-01",
    feesPaid: "1500",
    department: "DevOps",
    trainerName: "Mr. Smith",
    companyName: "Tech Corp",
  },
  {
    name: "John Roe",
    dateOfJoining: "2023-10-15",
    feesPaid: "1200",
    department: "DevOps",
    trainerName: "Ms. Jones",
    companyName: "Innovate LLC",
  },
];

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const router = useRouter();

  const addStudent = (student: Student) => {
    setStudents((prevStudents) => [student, ...prevStudents]);
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="bg-card/30 backdrop-blur-lg border-b border-border/50 sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
             <Cpu className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground">DevOps Credentialer</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Add New Student</h2>
              <StudentForm onAddStudent={addStudent} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Registered Students</h2>
            <StudentList students={students} />
          </div>
        </div>
      </main>
    </div>
  );
}
