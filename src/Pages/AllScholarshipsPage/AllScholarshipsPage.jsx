import React from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const AllScholarshipsPage = () => {
  const scholarships = useLoaderData();

  const handleViewDetails = (id) => {
    console.log(`View Details clicked for ID: ${id}`);
  };

  return (
    <section className="py-12 md:py-16 bg-base-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Explore All Scholarships
        </h1>

        {/* --- Search and Filter Area Structure --- */}
        <div className="bg-base-200 p-6 rounded-xl shadow-lg mb-8">
          {/* 1. Search Bar Structure */}
          <div className="form-control mb-6 w-full">
            <label className="input input-bordered flex items-center gap-2 bg-white w-full">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                className="grow w-full"
                placeholder="Search by Scholarship Name, University, or Degree..."
              />
            </label>
          </div>

          {/* 2. Filters Structure (Dropdowns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Scholarship Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaTag /> Category
                </span>
              </label>
              <select className="select select-bordered w-full">
                <option value="">All Categories</option>
                <option>Merit-based</option>
                <option>Research</option>
              </select>
            </div>

            {/* Subject Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaFilter /> Subject
                </span>
              </label>
              <select className="select select-bordered w-full">
                <option value="">All Subjects </option>
                <option>Science</option>
                <option>Arts & Humanities</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </span>
              </label>
              <select className="select select-bordered w-full">
                <option value="">All Locations </option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="form-control">
              <button className="btn btn-ghost mt-auto h-full min-h-12 border-none">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* --- Scholarship Grid Results Structure --- */}
        <h2 className="text-2xl font-semibold mb-6">
          Showing {scholarships.length} Results
        </h2>

        {/* Responsive Card Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
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
                  <Link
                    to={`/scholarship/${scholarship._id}`}
                    className="btn btn-primary btn-sm btn-outline w-full"
                  >
                    <button onClick={() => handleViewDetails(scholarship._id)}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-outline btn-wide">
            Load More Scholarships
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllScholarshipsPage;
