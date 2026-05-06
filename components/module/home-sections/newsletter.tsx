"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">
            Get the latest updates, exclusive deals, and culinary inspiration delivered straight to your inbox.
          </p>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-4">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-background border-primary/20 focus-visible:ring-primary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubscribe} className="w-full sm:w-auto font-medium">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
}
