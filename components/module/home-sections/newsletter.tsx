"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    // Add delay as requested
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thanks for subscribing!");
    setEmail("");
    setSubmitting(false);
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
          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-4">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-background border-primary/20 focus-visible:ring-primary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto font-medium">
              {submitting ? "Submitting..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
}
