import AboutInfo from "@/components/AboutPage/AboutInfo";
import MapChart from "@/components/AboutPage/MapChart";
import AboutHero from "@/components/AboutPage/hero";
import OurClientSay from "@/components/AboutPage/ourClientSay";
import OurTeam from "@/components/AboutPage/ourTeam";
import { CardServices } from "@/components/BecomLocalExpertPage/services";
import React from "react";

const About = () => {
  return (
    <>
      <main>
        <AboutHero />
        <AboutInfo />
        <CardServices />
        <OurClientSay />
        <OurTeam />
        <MapChart />
      </main>
    </>
  );
};

export default About;
