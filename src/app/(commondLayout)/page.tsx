import { Hero1 } from "@/components/hero1";
import React from "react";
import FoodSection from "@/components/module/food-section/food-section";
import Gallery from "@/components/shadcn-space/blocks/gallery-01/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-02/cta";
import Services from "@/components/services";
import { FAQSection } from "@/components/module/home-sections/faq";
import { TestimonialSection } from "@/components/module/home-sections/testimonials";
import { NewsletterSection } from "@/components/module/home-sections/newsletter";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Hero1></Hero1>
      </div>
      <FoodSection></FoodSection>
      <Gallery />
      <TestimonialSection />
      <Services />
      <FAQSection />
      <NewsletterSection />
      <CTA />
    </div>
  );
}
