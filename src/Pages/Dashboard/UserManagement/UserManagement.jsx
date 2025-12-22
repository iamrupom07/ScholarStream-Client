import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 2. Handle Make Admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeModerator = (user) => {
    axiosSecure.patch(`/users/moderator/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Moderator!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleMakeStudent = (user) => {
    axiosSecure.patch(`/users/student/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Student!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // 4. Handle Delete User
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="  min-h-screen">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
          <p className="text-gray-500">Total Users: {users.length}</p>
        </div>
        <div className="stats border">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaUsers className="text-3xl" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-white rounded-xl ">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Current Role</th>
              <th className="text-center">Role Actions</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors border-b last:border-none"
              >
                {/* Index */}
                <th className="text-gray-400">{index + 1}</th>

                {/* User Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"
                          }
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {user.displayName}
                      </div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-error text-white font-bold p-3">
                      Admin
                    </span>
                  ) : user.role === "moderator" ? (
                    <span className="badge badge-warning text-white font-bold p-3">
                      Moderator
                    </span>
                  ) : (
                    <span className="badge badge-ghost text-gray-500 p-3">
                      Student
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td>
                  <div className="flex justify-center gap-2">
                    {/* Make Admin Button */}
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      disabled={user.role === "admin"}
                      className="btn btn-sm btn-ghost bg-indigo-50 text-indigo-600 hover:bg-indigo-100 tooltip"
                      data-tip="Make Admin"
                    >
                      <FaUserShield className="text-lg" />
                    </button>

                    {/* Make Moderator Button (Optional based on requirements) */}
                    <button
                      onClick={() => handleMakeModerator(user)}
                      disabled={user.role === "moderator"}
                      className="btn btn-sm btn-ghost bg-orange-50 text-orange-500 hover:bg-orange-100 tooltip"
                      data-tip="Make Moderator"
                    >
                      <FaUsers className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleMakeStudent(user)}
                      disabled={user.role === "student"}
                      className="btn btn-sm btn-ghost bg-orange-50 text-gray-500 hover:bg-orange-100 tooltip"
                      data-tip="Make Student"
                    >
                      <FaUsers className="text-lg" />
                    </button>
                  </div>
                </td>

                {/* Delete Button */}
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-sm bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
