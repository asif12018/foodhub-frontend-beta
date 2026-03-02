import { Hero1 } from "@/components/hero1";
import React from "react";
import FoodSection from "@/components/module/food-section/food-section";
import Gallery from "@/components/shadcn-space/blocks/gallery-01/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-02/cta";
import Services from "@/components/services";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Hero1></Hero1>
      </div>
      <FoodSection></FoodSection>
      <Gallery />
      <CTA />
      <Services />
    </div>
  );
}
