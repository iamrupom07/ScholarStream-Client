import React from "react";
import { FaUniversity, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const FeaturedSection = () => {
  const scholarships = [
    {
      id: 1,
      university: "Harvard University",
      degree: "Masters in Data Science",
      amount: "$25,000",
      deadline: "Dec 31, 2024",
      category: "Merit-based",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      university: "Stanford University",
      degree: "Computer Science PhD",
      amount: "Full Ride",
      deadline: "Jan 15, 2025",
      category: "Research",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
      rating: 4.9,
    },
    {
      id: 3,
      university: "MIT",
      degree: "Engineering Bootcamp",
      amount: "$10,000",
      deadline: "Feb 20, 2025",
      category: "Technical",
      image:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop",
      rating: 4.7,
    },
    {
      id: 4,
      university: "Oxford University",
      degree: "MBA Scholarship",
      amount: "$30,000",
      deadline: "Mar 10, 2025",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
      rating: 4.6,
    },
    {
      id: 5,
      university: "Cambridge",
      degree: "Arts & Humanities",
      amount: "$15,000",
      deadline: "Apr 05, 2025",
      category: "Creative",
      image:
        "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop",
      rating: 4.5,
    },
    {
      id: 6,
      university: "ETH Zurich",
      degree: "Physics Fellowship",
      amount: "$20,000",
      deadline: "May 01, 2025",
      category: "Science",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
    },
  ];
  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Scholarships</h2>
          <p className="text-lg text-gray-600">
            Browse our top picks for the upcoming academic year.
          </p>
        </div>

        {/* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <figure className="relative h-48 w-full">
                <img
                  src={scholarship.image}
                  alt={scholarship.university}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 badge badge-secondary font-semibold">
                  {scholarship.rating} ★
                </div>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-xl text-primary">
                  {scholarship.university}
                  <div className="badge badge-outline text-xs">
                    {scholarship.category}
                  </div>
                </h3>
                <p className="font-medium text-gray-600">
                  {scholarship.degree}
                </p>

                {/* Meta Info */}
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span className="text-yellow-500">💰</span>{" "}
                    {/* Or use <FaDollarSign /> */}
                    <span>{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span className="text-blue-500">📅</span>{" "}
                    {/* Or use <FaCalendarAlt /> */}
                    <span>Deadline: {scholarship.deadline}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm btn-outline w-full">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-12">
          <button className="btn btn-neutral btn-wide">
            View All Scholarship
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
