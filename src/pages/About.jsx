import React from "react";
import AreasActivity from "../components/AreasActivity/AreasActivity";
import AboutMe from "../components/AboutMe/AboutMe";
import Mission from "../components/Mission/Mission";
import CTASection from "../components/CTASection/CTASection";

function About() {
  return (
    <div>
      <AboutMe />
      <AreasActivity />
      <Mission />
      <CTASection />
    </div>
  );
}

export default About;
