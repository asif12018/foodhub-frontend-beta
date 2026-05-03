import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const features = [
    "Vast network of top-rated local restaurants",
    "Lightning-fast delivery straight to your door",
    "Real-time order tracking",
    "Secure and easy payment options",
    "24/7 dedicated customer support",
    "Exclusive deals and regular discounts",
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">About FoodHub</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At FoodHub, we believe that great food brings people together. Our mission is to connect hungry diners with the best local restaurants, making it easier than ever to discover new flavors and enjoy your favorite meals from the comfort of your home.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We started with a simple idea: food delivery should be fast, reliable, and accessible to everyone. Today, we're proud to partner with hundreds of restaurants to serve our community.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Assorted food items" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
