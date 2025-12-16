import React from "react";
import { FaUniversity, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router";

const FeaturedSection = ({ FeaturedData }) => {
  console.log(FeaturedData);
  const scholarships = FeaturedData;
  const handleViewDetails = (id) => {
    console.log(`View Details clicked for ID: ${id}`);
  };

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
              key={scholarship._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <figure className="relative h-48 w-full">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.universityName}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 badge badge-secondary font-semibold">
                  {scholarship.rating} ★
                </div>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-xl text-primary">
                  {scholarship.universityName}
                  <div className="badge badge-outline text-xs w-32">
                    {scholarship.scholarshipCategory}
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
                    <span>{scholarship.tuitionFees}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span className="text-blue-500">📅</span>{" "}
                    {/* Or use <FaCalendarAlt /> */}
                    <span>Deadline: {scholarship.applicationDeadline}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link to={`/scholarship/${scholarship._id}`}  className="btn btn-primary btn-sm btn-outline w-full">
                    <button
                      onClick={() => handleViewDetails(scholarships._id)}
                     
                    >
                      View Details
                    </button>
                  </Link>
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
