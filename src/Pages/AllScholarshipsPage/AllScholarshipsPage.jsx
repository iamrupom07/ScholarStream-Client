import React from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";

// Mock data is retained only for rendering the structure
const allScholarships = [
  // Retained 3 items for grid structure visualization
  {
    id: 1,
    name: "Global Excellence Grant",
    university: "Harvard University",
    category: "Merit-based",
    location: "USA",
    fee: 0,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "STEM Innovation Fellowship",
    university: "Stanford University",
    category: "Research",
    location: "USA",
    fee: 50,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Commonwealth Scholar Award",
    university: "Oxford University",
    category: "International",
    location: "UK",
    fee: 100,
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  },
];

const AllScholarshipsPage = () => {
  // Placeholder handlers to satisfy the structure
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
                <option value="">All Categories (Placeholder)</option>
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
                <option value="">All Subjects (Placeholder)</option>
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
                <option value="">All Locations (Placeholder)</option>
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
        <h2 className="text-2xl font-semibold mb-6">Showing [X] Results</h2>

        {/* Responsive Card Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allScholarships.map((sch) => (
            <div
              key={sch.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* University Image */}
              <figure className="h-48">
                <img
                  src={sch.image}
                  alt={sch.university}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body p-6">
                {/* Scholarship Name & University */}
                <h3 className="card-title text-xl leading-tight">{sch.name}</h3>
                <p className="text-lg font-semibold text-primary mb-3">
                  {sch.university}
                </p>

                {/* Key Info Badges/Labels */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaTag className="text-secondary" />
                    <span className="font-medium">{sch.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-info" />
                    <span>{sch.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-success" />
                    <span>
                      Application Fee:
                      <span className="font-bold ml-1">
                        {sch.fee > 0 ? `$${sch.fee}` : "Free"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="card-actions justify-end mt-5">
                  <button
                    onClick={() => handleViewDetails(sch.id)}
                    className="btn btn-primary btn-block"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for Pagination/Load More */}
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
