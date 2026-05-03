"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string | StaticImageData;
    alt: string;
  };
  className?: string;
}

const sliderImages = [
  "/food-img-2.png",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop", // Burger
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop", // Pizza
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"  // Salad
];

const Hero1 = ({
  badge = "",
  heading = "Hungry? We’ve Got You Covered",
  description = "Discover nearby restaurants, customize your meals, and get them delivered hot and fresh — all in just a few clicks",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  className,
}: Hero1Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={cn("relative py-32 overflow-hidden bg-background", className)}>
      {/* Decorative Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 shadow-sm transition-all hover:bg-primary/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {badge}
              </Badge>
            )}
            <h1 className="text-5xl font-extrabold tracking-tight text-balance lg:text-7xl">
              Hungry? We’ve Got <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">You Covered</span>
            </h1>
            <p className="max-w-xl text-muted-foreground text-lg leading-relaxed lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start mt-4">
              {buttons.primary && (
                <Button asChild size="lg" className="w-full sm:w-auto rounded-full font-semibold px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Link href="/allFood">Order Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-semibold px-8 backdrop-blur-sm bg-background/50 hover:bg-muted/80 transition-all border-border">
                <Link href="/allProvider">Explore Restaurants</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted relative">
                    <img src={`https://randomuser.me/api/portraits/men/${i+10}.jpg`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-bold flex items-center gap-1 text-foreground">
                  4.8 <span className="text-yellow-500">★★★★★</span>
                </div>
                <div className="text-muted-foreground">from 2,000+ reviews</div>
              </div>
            </div>
          </div>
          
          {/* Right side image with slider functionality */}
          <div className="relative aspect-square w-full mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
            
            {sliderImages.map((src, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 ease-in-out",
                  index === currentImageIndex 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-95 z-0"
                )}
              >
                {src.startsWith('/') ? (
                   <Image
                     src={src}
                     alt="Delicious food"
                     fill
                     className="object-contain drop-shadow-2xl"
                     priority={index === 0}
                   />
                ) : (
                   <div className="w-full h-full rounded-full overflow-hidden border-8 border-background/50 shadow-2xl relative">
                     <img 
                       src={src} 
                       alt="Delicious food" 
                       className="w-full h-full object-cover" 
                     />
                   </div>
                )}
              </div>
            ))}
            
            {/* Slider Indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {sliderImages.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === currentImageIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-primary/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
