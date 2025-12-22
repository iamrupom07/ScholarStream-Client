import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div
      className="hero min-h-[60vh] my-4 relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Fund Your Future</h1>
          <p className="mb-5 text-lg">
            Discover thousands of scholarships tailored to your academic goals.
            Don't let tuition costs hold you back—start your journey today.
          </p>
          <Link
            to={"/all-scholarships"}
            className="btn btn-outline btn-lg shadow-lg"
          >
            Search Scholarship
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
