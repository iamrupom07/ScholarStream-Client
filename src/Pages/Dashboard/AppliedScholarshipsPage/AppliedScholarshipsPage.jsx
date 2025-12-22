import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AppliedScholarshipsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?searchText=${searchText}`
      );
      return res.data;
    },
  });

  const handleUpdate = async (id, status, feedback) => {
    try {
      await axiosSecure.patch(`/applications/${id}`, {
        applicationStatus: status,
        feedback,
      });

      // Refetch data
      refetch();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Application status has been updated to "${status}"`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/applications/${id}`);

      Swal.fire({
        title: "Deleted!",
        text: "Application has been removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete application.",
        icon: "error",
      });
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Applications</h1>
      <p>Total Applications : {applications.length}</p>

      <input
        onChange={(e) => setSearchText(e.target.value)}
        className="input input-bordered w-96"
        placeholder="Search..."
      />

      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>Email</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.scholarshipName}</td>
              <td>{app.userEmail}</td>

              <td>
                <select
                  className="select select-sm"
                  value={app.applicationStatus}
                  onChange={(e) =>
                    handleUpdate(app._id, e.target.value, app.feedback || "")
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>

              <td>
                <input
                  defaultValue={app.feedback}
                  className="input input-sm"
                  placeholder="Feedback"
                  onBlur={(e) =>
                    handleUpdate(app._id, app.applicationStatus, e.target.value)
                  }
                />
              </td>

              <td>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="btn btn-error btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedScholarshipsPage;
