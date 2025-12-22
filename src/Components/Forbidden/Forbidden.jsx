import React from "react";
import { Link, useNavigate } from "react-router";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated Icon Section */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-error opacity-20 blur-3xl rounded-full scale-150"></div>
          <div className="relative bg-white p-8 rounded-full shadow-2xl">
            <FaLock className="text-error text-7xl animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-9xl font-black text-gray-300 select-none">403</h1>
        <h2 className="text-3xl font-bold text-gray-800 -mt-10 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          Halt! You don't have the clearance to view this page. If you believe
          this is a mistake, please contact your administrator.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>

          <Link to="/" className="btn btn-primary gap-2 text-white">
            <FaHome /> Return Home
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 opacity-50">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-error rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
