import React from "react";
import {
  FaGraduationCap,
  FaRegHeart,
  FaCalendarCheck,
  FaArrowRight,
  FaEllipsisV,
  FaCalendarAlt,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardMainContent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: recentApplications = [] } = useQuery({
    queryKey: ["recentApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recent-applications/${user?.email}`);
      return res.data;
    },
  });
  console.log(recentApplications);

  return (
    <div className="space-y-12">
      {/* --- Welcome Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.displayName || "Scholar"}
          </h1>
          <p className="text-gray-500 font-light mt-1">
            Here is what's happening with your applications today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to={"/all-scholarships"}
            className="btn btn-primary px-8 font-medium"
          >
            Find New Scholarships
          </Link>
        </div>
      </div>

      {/* --- Stats Overview --- */}
      <div className="stats stats-vertical lg:stats-horizontal bg-white border border-gray-100 w-full rounded-xl shadow-sm">
        <div className="stat px-8 py-6">
          <div className="stat-figure text-primary opacity-40">
            <FaGraduationCap className="text-3xl" />
          </div>
          <div className="stat-title text-xs uppercase tracking-widest font-bold text-gray-400">
            Total Applied
          </div>
          <div className="stat-value text-3xl mt-1">
            {recentApplications.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Applications
            </h3>
            <Link to={"/dashboard/my-applications"}>
              <button className="btn btn-ghost btn-sm text-primary font-bold">
                View All
              </button>
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-gray-50/50">
                <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                  <th>Scholarship / University</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">
                          {app.scholarshipName}
                        </span>
                        <span className="text-xs font-light">
                          {app.universityName}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm font-light">
                      {" "}
                      <span className="font-semibold">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                      <p className="text-xs text-gray-400">
                        {new Date(app.appliedDate).toLocaleTimeString()}
                      </p>
                    </td>
                    <td>
                      <div
                        className={`badge badge-md ${
                          app.applicationStatus === "pending"
                            ? "badge-warning"
                            : app.applicationStatus === "rejected"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {app.applicationStatus}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainContent;
