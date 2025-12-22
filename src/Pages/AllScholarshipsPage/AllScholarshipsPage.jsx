import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllScholarshipsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    scholarshipCategory: "",
    subjectCategory: "",
    location: "",
  });
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(6); // Items per page

  const axiosSecure = useAxiosSecure();

  // Fetch scholarships with filters and pagination
  const { data, isLoading, error } = useQuery({
    queryKey: ["scholarships", searchText, filters, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchText) params.append("searchText", searchText);
      if (filters.scholarshipCategory)
        params.append("scholarshipCategory", filters.scholarshipCategory);
      if (filters.subjectCategory)
        params.append("subjectCategory", filters.subjectCategory);
      if (filters.location) params.append("location", filters.location);
      params.append("page", page);
      params.append("limit", limit);

      const res = await axiosSecure.get(`/scholarships?${params.toString()}`);
      return res.data; // expects { scholarships: [], total: number }
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const totalScholarships = data?.total || 0;
  const totalPages = Math.ceil(totalScholarships / limit);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1); // Reset page when filters change
  };

  const handleClearFilters = () => {
    setFilters({ scholarshipCategory: "", subjectCategory: "", location: "" });
    setSearchText("");
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading scholarships...</p>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        Error loading scholarships.
      </p>
    );

  return (
    <section className="py-12 md:py-16 bg-base-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Explore All Scholarships
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Total Scholarships Available:{" "}
          <span className="font-bold">{totalScholarships}</span>
        </p>

        {/* Search & Filters */}
        <div className="bg-base-200 p-6 rounded-xl shadow-lg mb-8">
          <div className="form-control mb-6 w-full">
            <label className="input input-bordered flex items-center gap-2 bg-white w-full">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                className="grow w-full"
                placeholder="Search by Scholarship Name, University, or Degree..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Scholarship Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaTag /> Category
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.scholarshipCategory}
                onChange={(e) =>
                  handleFilterChange("scholarshipCategory", e.target.value)
                }
              >
                <option value="">All Categories</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial fund">Partial fund</option>
                <option value="Merit-based">Merit-based</option>
                <option value="Research">Research</option>
              </select>
            </div>

            {/* Subject Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaFilter /> Subject
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.subjectCategory}
                onChange={(e) =>
                  handleFilterChange("subjectCategory", e.target.value)
                }
              >
                <option value="">All Subjects</option>
                <option value="Science">Science</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Law">Law</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Australia">Australia</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="form-control">
              <button
                onClick={handleClearFilters}
                className="btn btn-ghost mt-auto h-full min-h-12 border-none"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Scholarship Grid */}
        {scholarships.length === 0 ? (
          <p className="text-center text-gray-500">No scholarships found.</p>
        ) : (
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
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <FaMoneyBillWave className="text-green-500" />
                      <span>${scholarship.tuitionFees}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <span>
                        📅 Deadline: {scholarship.applicationDeadline}
                      </span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/scholarship/${scholarship._id}`}
                      className="btn btn-primary btn-sm btn-outline w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {page < totalPages && (
          <div className="text-center mt-12">
            <button onClick={loadMore} className="btn btn-outline btn-wide">
              Load More Scholarships
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllScholarshipsPage;
