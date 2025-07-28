"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { personalizedCongratulations } from "@/ai/flows/personalized-congratulations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { type Student } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  dateOfJoining: z.date({ required_error: "A date of joining is required." }),
  feesPaid: z.string().min(1, { message: "Fees paid is required." }).regex(/^\d+$/, { message: "Please enter a valid amount." }),
  trainerName: z.string().min(2, { message: "Trainer name is required." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
});

type StudentFormProps = {
  onAddStudent: (student: Student) => void;
};

export function StudentForm({ onAddStudent }: StudentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      feesPaid: "",
      trainerName: "",
      companyName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const newStudent: Student = {
      ...values,
      dateOfJoining: format(values.dateOfJoining, "yyyy-MM-dd"),
      department: "DevOps", 
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    
    onAddStudent(newStudent);
    toast({
      title: "Success!",
      description: `${newStudent.name} has been added.`,
      variant: "default",
    });
    form.reset();
    setIsLoading(false);

    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const result = await personalizedCongratulations(newStudent);
      setAiResponse(result.message);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Could not generate a message at this time.");
    } finally {
      setIsAiLoading(false);
    }
  }

  return (
    <>
      <Card className="bg-card/30 border-border/60">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfJoining"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Joining</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feesPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fees Paid ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1500" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trainerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trainer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mr. Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tech Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input value="DevOps" readOnly className="bg-muted/50" />
                </FormControl>
              </FormItem>
              <Button type="submit" disabled={isLoading} className="w-full" variant="default">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  "Add Student"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={!!aiResponse || isAiLoading} onOpenChange={(open) => !open && setAiResponse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5" />
              Personalized Message
            </DialogTitle>
            <DialogDescription>
              Here's a special message for the new student.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[6rem] flex items-center justify-center">
            {isAiLoading ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating message...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{aiResponse}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
