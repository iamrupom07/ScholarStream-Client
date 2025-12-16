import React from "react";
import HeroSection from "../../../Components/HeroSection/HeroSection";
import FeaturedSection from "../../../Components/FeaturedSection/FeaturedSection";
import Testimonials from "../../../Components/TestimonialsSection/Testimonials";
import FAQSection from "../../../Components/FAQSection/FAQSection";
import { useLoaderData } from "react-router";

const HomePage = () => {
  const FeaturedData = useLoaderData();
  console.log(FeaturedData);
  return (
    <div>
      <HeroSection></HeroSection>
    
      <FeaturedSection FeaturedData={FeaturedData}></FeaturedSection>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
    </div>
  );
};

export default HomePage;
