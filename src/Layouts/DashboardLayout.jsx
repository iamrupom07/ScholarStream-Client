import React from "react";
import {
  FaHome,
  FaUser,
  FaGraduationCap,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBell,
} from "react-icons/fa";

import DashboardNavbar from "../Pages/Share/DashboardNavbar/DashboardNavbar";
import { Link, Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = ({ children }) => {
  const { signOutUser } = useAuth();

  const handleLogout = () => {
    signOutUser()
      .then((result) => {
        console.log("User logged out successfully", result.user);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };
  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen ">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content Area --- */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-white border-b border-gray-100 px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square drawer-button"
            >
              <FaBars className="text-xl" />
            </label>
          </div>

          <div className="flex-1">
            <DashboardNavbar></DashboardNavbar>
          </div>
        </div>

        {/* Content Viewport */}
        <main className="p-6 lg:p-10 bg-gray-50/50 flex-grow">
          {/* This is where your specific page content (Statistics, Tables, etc.) will render */}
          <div className="max-w-6xl mx-auto">
            {children || (
              <div className="text-center py-20">
                <Outlet></Outlet>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- Sidebar Structure --- */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="menu p-6 w-80 min-h-full bg-white text-base-content border-r border-gray-100 flex flex-col">
          {/* Logo / Branding */}
          <div className="px-4 mb-10">
            <h1 className="text-2xl font-black tracking-tighter text-primary">
              SCHOLAR<span className="text-gray-400">STREAM</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow space-y-2">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Main Menu
            </p>
            <li>
              <a className="active flex gap-4 py-3 rounded-lg font-medium">
                <FaHome className="text-lg" /> Dashboard
              </a>
            </li>
            <li>
              <a className="flex gap-4 py-3 rounded-lg font-medium text-gray-500 hover:text-primary">
                <FaGraduationCap className="text-lg" /> Applied Scholarships
              </a>
            </li>
            <li>
              <a className="flex gap-4 py-3 rounded-lg font-medium text-gray-500 hover:text-primary">
                <FaHeart className="text-lg" /> Favorites
              </a>
            </li>
            <li>
              <a className="flex gap-4 py-3 rounded-lg font-medium text-gray-500 hover:text-primary">
                <FaUser className="text-lg" /> My Profile
              </a>
            </li>
          </div>

          {/* Bottom Menu */}
          <div className="pt-6 border-t border-gray-100 space-y-2">
            <li>
              <a className="flex gap-4 py-3 rounded-lg font-medium text-gray-500 hover:text-primary">
                <FaCog className="text-lg" /> Settings
              </a>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={handleLogout}
                className="flex gap-4 py-3 rounded-lg font-medium text-error"
              >
                <FaSignOutAlt className="text-lg" /> Logout
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
