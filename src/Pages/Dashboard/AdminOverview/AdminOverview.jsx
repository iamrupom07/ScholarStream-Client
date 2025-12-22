import { useQuery } from "@tanstack/react-query";

import {
  FaUsers,
  FaFileAlt,
  FaDollarSign,
  FaGraduationCap,
} from "react-icons/fa";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Fetching Stats Data
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // Data for the Pie Chart (Example structure)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  console.log(stats);
  return (
    <div className="p-2  min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Welcome Back, Admin</h2>

      {/* --- Stats Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        {/* Total Revenue */}
        <div className="stat bg-white shadow-md rounded-xl">
          <div className="stat-figure text-success text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-success">${stats.revenue || 0}</div>
          <div className="stat-desc">From application fees</div>
        </div>

        {/* Total Users */}
        <div className="stat bg-white shadow-md rounded-xl">
          <div className="stat-figure text-primary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.users || 0}</div>
          <div className="stat-desc">Registered accounts</div>
        </div>

        {/* Total Applications */}
        <div className="stat bg-white shadow-md rounded-xl">
          <div className="stat-figure text-secondary text-3xl">
            <FaFileAlt />
          </div>
          <div className="stat-title">Applications</div>
          <div className="stat-value text-secondary">
            {stats.applications || 0}
          </div>
          <div className="stat-desc">Across all categories</div>
        </div>

        {/* Total Scholarships */}
        <div className="stat bg-white shadow-md rounded-xl">
          <div className="stat-figure text-accent text-3xl">
            <FaGraduationCap />
          </div>
          <div className="stat-title">Scholarships</div>
          <div className="stat-value text-accent">
            {stats.scholarships || 0}
          </div>
          <div className="stat-desc">Active listings</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
