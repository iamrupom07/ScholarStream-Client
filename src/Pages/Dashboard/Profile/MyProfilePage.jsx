import React from "react";
import { FaUser, FaGraduationCap } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch existing user data from MongoDB
  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // 2. Handle Form Submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      phone: form.phone.value,
      location: form.location.value,
      universityName: form.universityName.value,
      fieldOfStudy: form.fieldOfStudy.value,
      cgpa: form.cgpa.value,
    };

    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", error);
    }
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-gray-500 font-light mt-1">
          Manage personal info and academic credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-4 shadow-xl">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="Avatar"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {user?.displayName || "User"}
          </h2>
          <div className="badge badge-primary badge-outline mt-2 uppercase text-[10px]">
            {dbUser?.role || "Student"}
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleUpdateProfile} className="space-y-12">
            <section>
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <FaUser className="text-primary text-sm" />
                <h3 className="font-bold text-lg">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-500 mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={dbUser?.phone || "01900000000"}
                    className="input input-bordered w-full"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-500 mb-2">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={dbUser?.location || "Bangladesh"}
                    className="input input-bordered w-full"
                    placeholder="Toronto, Canada"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <FaGraduationCap className="text-primary text-sm" />
                <h3 className="font-bold text-lg">Academic Background</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-500 mb-2">
                    Current University
                  </label>
                  <input
                    name="universityName"
                    type="text"
                    defaultValue={dbUser?.universityName}
                    className="input input-bordered w-full"
                    placeholder="University of Toronto"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-500 mb-2">
                    Field of Study
                  </label>
                  <input
                    name="fieldOfStudy"
                    type="text"
                    defaultValue={dbUser?.fieldOfStudy}
                    className="input input-bordered w-full"
                    placeholder="Computer Science"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-500 mb-2">
                    Current CGPA
                  </label>
                  <input
                    name="cgpa"
                    type="text"
                    defaultValue={dbUser?.cgpa}
                    className="input input-bordered w-full"
                    placeholder="3.92"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-6 border-t gap-4">
              <button type="submit" className="btn btn-primary px-10 shadow-lg">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
