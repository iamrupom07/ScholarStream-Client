import React from "react";
import {
  FaHome,
  FaUser,
  FaGraduationCap,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTimesCircle,
  FaHistory,
} from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";

import DashboardNavbar from "../Pages/Share/DashboardNavbar/DashboardNavbar";
import { Link, Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { signOutUser } = useAuth();
  const { role } = useRole();

  const handleLogout = () => {
    signOutUser().catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* TOP NAVBAR */}
        <div className="navbar bg-white border-b px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square drawer-button"
            >
              <FaBars className="text-xl" />
            </label>
          </div>

          <div className="flex-1">
            <DashboardNavbar />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 lg:p-10 bg-gray-50 flex-grow">
          <div className="w-11/12 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="menu p-6 w-80 min-h-full bg-white border-r flex flex-col">
          {/* LOGO */}
          <div className="px-4 mb-10">
            <h1 className="text-2xl font-black text-primary">
              SCHOLAR<span className="text-gray-400">STREAM</span>
            </h1>
          </div>

          {/* MENU */}
          <ul className="flex-grow space-y-2">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase">
              Main Menu
            </p>

            {/* OVERVIEW */}
            <li>
              {role?.role === "admin" ? (
                <>
                  <Link to={"/dashboard/admin-stats"}>
                    <FaHome />
                    Admin Overview
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/dashboard"}>
                    <FaHome />
                    Overview
                  </Link>
                </>
              )}
            </li>

            {(role?.role === "admin" || role?.role === "moderator") && (
              <li>
                <Link
                  to="/dashboard/applied-scholarships"
                  className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
                >
                  <FaGraduationCap /> Manage Scholarships
                </Link>
              </li>
            )}

            {/* MY APPLICATIONS */}
            <li>
              <Link
                to="/dashboard/my-applications"
                className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
              >
                <FaGraduationCap /> My Applications
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/payment-history"
                className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
              >
                <FaHistory /> Payment History
              </Link>
            </li>

            {/* MY REVIEWS */}
            <li>
              <Link
                to="/dashboard/my-reviews"
                className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
              >
                <MdOutlineReviews /> My Reviews
              </Link>
            </li>

            {/* ADMIN ONLY */}
            {role?.role === "admin" && (
              <li>
                <Link
                  to="/dashboard/user-management"
                  className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
                >
                  <FaUser /> User Management
                </Link>
              </li>
            )}

            {/* PROFILE */}
            <li>
              <Link
                to="/dashboard/myprofile"
                className="flex gap-4 py-3 rounded-lg text-gray-500 hover:text-primary"
              >
                <FaUser /> My Profile
              </Link>
            </li>
          </ul>

          {/* BOTTOM MENU */}
          <ul className=" border-t space-y-2">
            <li>
              <Link
                to="/"
                onClick={handleLogout}
                className="flex gap-4 py-3 rounded-lg text-error"
              >
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
