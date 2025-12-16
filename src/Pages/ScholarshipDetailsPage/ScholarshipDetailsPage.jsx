import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaUniversity,
  FaFileAlt,
  FaBookmark,
  FaShare,
} from "react-icons/fa";
import { FaDollarSign, FaCircleCheck } from "react-icons/fa6";
import { useLoaderData } from "react-router";

const ScholarshipDetailsPage = () => {
  const scholarshipData = useLoaderData();
  console.log(scholarshipData);
  // Placeholder for the application process navigation
  const handleApply = () => console.log("Apply Now clicked");
  const handleSave = () => console.log("Save Scholarship clicked");

  return (
    <section className="bg-white py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* --- Header & Action Row --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
              {scholarshipData.universityName}
            </h1>
            <div className="flex items-center text-xl text-gray-600">
              <FaUniversity className="mr-3 text-primary/70" />
              <span className="font-light">
                {scholarshipData.scholarshipName}
              </span>
            </div>
            <div className="mt-2">
              {" "}
              <span className="font-bold ">World Rank :</span>{" "}
              {scholarshipData.universityWorldRank}
            </div>
            <div className="mt-2">
              {" "}
              <span className="font-bold ">Tution Fees :</span>{" "}
              {scholarshipData.tuitionFees}
            </div>
          </div>

          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              className="btn btn-ghost btn-circle"
              onClick={handleSave}
              aria-label="Save Scholarship"
            >
              <FaBookmark className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
            </button>
            <button className="btn btn-ghost btn-circle" aria-label="Share">
              <FaShare className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* --- Main Content Layout (Two Columns) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column (Main Content) - lg:col-span-2 */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Overview and Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Scholarship Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {scholarshipData.scholarshipDescription}
              </p>
            </div>

            {/* 2. Key Information Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
              <div className="flex flex-col items-start space-y-1">
                <FaDollarSign className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Award Value
                </span>
                <span className="text-lg font-medium">
                  {scholarshipData.scholarshipCategory}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaClock className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Duration
                </span>
                <span className="text-sm font-medium">
                  {scholarshipData.scholarshipPostDate} -{" "}
                  {scholarshipData.applicationDeadline}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaMapMarkerAlt className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Location
                </span>
                <span className="text-sm font-medium">
                  {scholarshipData.universityCountry} ,{" "}
                  {scholarshipData.universityCity}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaCalendarAlt className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Deadline
                </span>
                <span className="text-sm font-medium text-red-500">
                  {scholarshipData.applicationDeadline}
                </span>
              </div>
            </div>

            <div className="tabs tabs-lift">
              <input
                type="radio"
                name="my_tabs_3"
                className="tab font-bold"
                aria-label="Study Info Tab"
              />
              <div className="tab-content bg-base-100 border-base-300 p-6 list">
                <ol>
                  <li>
                    {" "}
                    <span className="font-bold ">Degree :</span>{" "}
                    {scholarshipData.degree}
                  </li>
                  <li>
                    {" "}
                    <span className="font-bold ">Subject Category :</span>{" "}
                    {scholarshipData.subjectCategory}
                  </li>
                </ol>
              </div>

              <input
                type="radio"
                name="my_tabs_3"
                className="tab font-bold"
                aria-label="Stipend Info Tab"
                defaultChecked
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <ol>
                  <li>
                    {" "}
                    <span className="font-bold ">Degree :</span>{" "}
                    {scholarshipData.stipend}
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Action) - lg:col-span-1 */}
          <div className="lg:col-span-1 lg:sticky lg:top-8 self-start">
            <div className="p-8 border border-gray-300 rounded-xl bg-gray-50 transition-shadow hover:shadow-lg">
              <h3 className="text-lg font-light text-gray-500 mb-3 uppercase tracking-wider">
                Action
              </h3>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <span className="text-3xl font-extrabold text-primary block"></span>
                <span className="text-sm font-light text-gray-600">
                  Annual Tax-Free Stipend
                </span>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-light">Tuition Coverage:</span>
                  <span className="font-semibold text-gray-800">100%</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-light">Application Fee:</span>
                  <span className="font-semibold text-gray-800">
                    {scholarshipData.applicationFees}
                  </span>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="btn btn-block btn-primary btn-lg font-normal tracking-wide"
              >
                Apply Now
              </button>

              <p className="text-center text-xs mt-4 text-gray-500">
                This is an external application, you will be redirected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetailsPage;
