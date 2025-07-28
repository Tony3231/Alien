"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm() {
  const router = useRouter();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl bg-white/90 backdrop-blur-sm border-gray-300">
      <CardContent className="p-1">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-1">
            <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md border border-transparent data-[state=inactive]:border-primary data-[state=inactive]:text-primary">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleAuth} className="p-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signin-username" className="text-gray-600">Username</Label>
                <Input id="signin-username" placeholder="Username" required className="bg-white border-gray-300"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-gray-600">Password</Label>
                <Input id="signin-password" type="password" placeholder="Password" required className="bg-white border-gray-300"/>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleAuth} className="p-4 space-y-4">
               <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-600">Email</Label>
                <Input id="signup-email" placeholder="m@example.com" type="email" required className="bg-white border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-gray-600">Username</Label>
                <Input id="signup-username" placeholder="johndoe" required className="bg-white border-gray-300"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-600">Password</Label>
                <Input id="signup-password" type="password" required className="bg-white border-gray-300"/>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pt-2">
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
