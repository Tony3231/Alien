"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { type Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type StudentListProps = {
  students: Student[];
};

export function StudentList({ students }: StudentListProps) {
  return (
    <Card className="bg-card/30 border-border/60">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="hidden md:table-cell">Date of Joining</TableHead>
                <TableHead className="text-right">Fees Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <TableRow key={index} className="border-border/60">
                    <TableCell>
                      <div className="font-medium text-foreground">{student.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {student.companyName} ({student.trainerName})
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/40 text-primary">{student.department}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {new Date(student.dateOfJoining + 'T00:00:00').toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">${new Intl.NumberFormat().format(Number(student.feesPaid))}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No students registered yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
