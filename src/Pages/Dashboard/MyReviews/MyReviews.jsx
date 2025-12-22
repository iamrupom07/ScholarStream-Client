import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaStar, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myReviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Review?",
      text: "This review will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review removed successfully.", "success");
            refetch();
          }
        } catch (err) {
          Swal.fire("Error", "Failed to delete review.", "error");
          console.error(err);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">
          My Reviews
        </h2>

        {myReviews.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500">
              You haven’t written any reviews yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th>#</th>
                  <th>University</th>

                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {myReviews.map((review, index) => (
                  <tr key={review._id} className="hover">
                    <th>{index + 1}</th>

                    <td className="font-semibold text-primary">
                      {review.universityName}
                    </td>

                    <td>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < review.ratingPoint
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="max-w-xs truncate">
                      {review.reviewComment}
                    </td>

                    <td className="text-sm flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-sm btn-outline btn-error"
                        title="Delete Review"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
