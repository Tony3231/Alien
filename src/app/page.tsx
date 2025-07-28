import { AuthForm } from "@/components/auth-form";
import { Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      {/* 
        BACKGROUND IMAGE: 
        Replace the URL in the style attribute below with the path to your background image.
        For example: style={{backgroundImage: "url('/your-background-image.jpg')"}}
      */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 -z-10"
        style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}}
        data-ai-hint="mysterious symbol red"
      >
      </div>

      <header className="absolute top-4 right-4 md:top-6 md:right-8">
        {/* 
          LOGO IMAGE: 
          Replace the div below with your "TONY" logo image.
          For example: <img src="/tony-logo.png" alt="Tony Logo" className="w-28 h-12" />
        */}
        <div className="flex items-center justify-center w-28 h-12 bg-black text-white font-bold text-2xl tracking-widest border-2 border-gray-500">
          TONY
        </div>
      </header>
      
      <div className="z-10 text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Aliens Brand Spot
        </h1>
      </div>

      <AuthForm />
    </div>
  );
}
