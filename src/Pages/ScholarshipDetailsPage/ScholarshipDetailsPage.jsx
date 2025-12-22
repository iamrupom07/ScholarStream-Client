import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUniversity,
  FaBookmark,
  FaShare,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ScholarshipDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();

  /* ================= Scholarship Data ================= */
  const { data: scholarshipData = {} } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  /* ================= Reviews Data ================= */
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  return (
    <section className="bg-white py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between mb-10 border-b pb-6">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">
              {scholarshipData.universityName}
            </h1>
            <div className="flex items-center text-gray-600">
              <FaUniversity className="mr-2" />
              {scholarshipData.scholarshipName}
            </div>

            <p className="mt-2">
              <span className="font-bold">World Rank:</span>{" "}
              {scholarshipData.universityWorldRank}
            </p>

            <p>
              <span className="font-bold">Tuition Fees:</span>{" "}
              {scholarshipData.tuitionFees}
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="btn btn-ghost btn-circle">
              <FaBookmark />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FaShare />
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Scholarship Overview
              </h2>
              <p className="text-gray-700">
                {scholarshipData.scholarshipDescription}
              </p>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y py-6">
              <div>
                <FaDollarSign className="text-primary text-xl" />
                <p className="text-xs text-gray-500">Category</p>
                <p>{scholarshipData.scholarshipCategory}</p>
              </div>

              <div>
                <FaClock className="text-primary text-xl" />
                <p className="text-xs text-gray-500">Duration</p>
                <p>
                  {scholarshipData.scholarshipPostDate} -{" "}
                  {scholarshipData.applicationDeadline}
                </p>
              </div>

              <div>
                <FaMapMarkerAlt className="text-primary text-xl" />
                <p className="text-xs text-gray-500">Location</p>
                <p>
                  {scholarshipData.universityCity},{" "}
                  {scholarshipData.universityCountry}
                </p>
              </div>

              <div>
                <FaCalendarAlt className="text-primary text-xl" />
                <p className="text-xs text-gray-500">Deadline</p>
                <p className="text-red-500">
                  {scholarshipData.applicationDeadline}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-8">
            <div className="border rounded-xl p-6 bg-gray-50">
              <p className="text-sm text-gray-500 mb-3">Application Fee</p>
              <p className="text-xl font-bold mb-6">
                {scholarshipData.applicationFees}
              </p>

              <Link
                to={`/scholarship/application/${scholarshipData._id}`}
                className="btn btn-primary btn-block"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS SECTION ================= */}
        <div className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8">
            Student Reviews ({reviews.length})
          </h2>

          {reviewsLoading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 italic">
              No reviews yet for this scholarship.
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => {
                const isMyReview = review.userEmail === user?.email;

                return (
                  <div
                    key={review._id}
                    className={`p-6 rounded-xl border ${
                      isMyReview
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex gap-3 items-center">
                        {review.userImage ? (
                          <img
                            src={review.userImage}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-400" />
                        )}

                        <div>
                          <p className="font-semibold">
                            {review.userName}
                            {isMyReview && (
                              <span className="badge badge-primary ml-2">
                                Your Review
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.ratingPoint
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mt-3">{review.reviewComment}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetailsPage;
