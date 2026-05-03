import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Food Enthusiast",
      content: "FoodHub has completely changed the way I order food. The variety is amazing and delivery is always on time. Highly recommended!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      content: "I love the user interface. It's so easy to find exactly what I'm craving. The customer service is also top notch.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Local Guide",
      content: "The best food delivery platform I've used so far. Great selection of local restaurants and very reliable delivery partners.",
      rating: 4,
      avatar: "ER",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about their FoodHub experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/50 border-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
