import React from "react";
import HeroSection from "../../../Components/HeroSection/HeroSection";
import FeaturedSection from "../../../Components/FeaturedSection/FeaturedSection";
import Testimonials from "../../../Components/TestimonialsSection/Testimonials";
import FAQSection from "../../../Components/FAQSection/FAQSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
    </div>
  );
};

export default HomePage;
