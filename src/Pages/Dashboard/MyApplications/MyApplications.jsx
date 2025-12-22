import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaEye,
  FaTrashAlt,
  FaUniversity,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // store reviews locally
  const [reviews, setReviews] = useState({});

  const {
    data: myApplications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel Application?",
      text: "This will permanently remove your application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/applications/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Application removed.", "success");
            refetch();
          }
        } catch (err) {
          Swal.fire("Error", "Could not delete application", "error");
          console.log(err);
        }
      }
    });
  };

  const handleReviewSubmit = async (app) => {
    const reviewData = reviews[app._id];

    if (!reviewData?.ratingPoint || !reviewData?.reviewComment) {
      Swal.fire("Error", "Rating and review are required", "error");
      return;
    }

    const payload = {
      scholarshipId: app.scholarshipId,
      universityName: app.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      ratingPoint: reviewData.ratingPoint,
      reviewComment: reviewData.reviewComment,
      reviewDate: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", payload);

      Swal.fire("Success", "Review submitted successfully!", "success");

      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to submit review", "error");
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
          My Applications
        </h2>

        {myApplications.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <p>You haven't applied for any scholarships yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>#</th>
                  <th>University</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Review</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {myApplications.map((app, index) => (
                  <tr key={app._id}>
                    <th>{index + 1}</th>

                    <td>
                      <div className="font-bold">{app.universityName}</div>
                      <div className="text-sm opacity-60">
                        {app.scholarshipName}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          app.applicationStatus === "pending"
                            ? "badge-warning"
                            : app.applicationStatus === "rejected"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>

                    <td className="text-xs">{app.feedback || "—"}</td>

                    {/* REVIEW COLUMN */}
                    <td>
                      {app.applicationStatus === "completed" ? (
                        <div className="space-y-2">
                          {/* Rating */}
                          <select
                            className="select select-bordered select-sm w-full"
                            value={reviews[app._id]?.ratingPoint || ""}
                            onChange={(e) =>
                              setReviews({
                                ...reviews,
                                [app._id]: {
                                  ...reviews[app._id],
                                  ratingPoint: Number(e.target.value),
                                },
                              })
                            }
                          >
                            <option value="">Rating</option>
                            {[1, 2, 3, 4, 5].map((r) => (
                              <option key={r} value={r}>
                                {r} Star{r > 1 && "s"}
                              </option>
                            ))}
                          </select>

                          {/* Comment */}
                          <input
                            type="text"
                            placeholder="Write your review..."
                            className="input input-bordered input-sm w-full"
                            value={reviews[app._id]?.reviewComment || ""}
                            onChange={(e) =>
                              setReviews({
                                ...reviews,
                                [app._id]: {
                                  ...reviews[app._id],
                                  reviewComment: e.target.value,
                                },
                              })
                            }
                          />

                          <button
                            onClick={() => handleReviewSubmit(app)}
                            className="btn btn-sm btn-primary w-full"
                          >
                            Submit Review
                          </button>
                        </div>
                      ) : (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>

                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          document
                            .getElementById(`modal_${app._id}`)
                            .showModal()
                        }
                        className="btn btn-square btn-sm btn-outline btn-primary"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-square btn-sm btn-outline btn-error"
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

export default MyApplications;
