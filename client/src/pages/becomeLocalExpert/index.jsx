import Hero from "@/components/BecomLocalExpertPage/hero";
import Meet from "@/components/BecomLocalExpertPage/meet";
import { CardServices } from "@/components/BecomLocalExpertPage/services";
import FAQacc from "@/components/FaqPage/faqSection";
import React from "react";

const BecomeLocalExpert = () => {
  return (
    <>
      <main>
        <Hero />
        <CardServices />
        <Meet />
        <FAQacc/>
      </main>
    </>
  );
};

export default BecomeLocalExpert;
