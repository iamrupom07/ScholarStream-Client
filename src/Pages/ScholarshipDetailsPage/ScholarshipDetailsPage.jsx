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

// --- Mock Data for a Single Scholarship ---
const scholarshipData = {
  id: 1,
  name: "Global Innovator Scholarship Program",
  university: "Imperial College London",
  location: "London, UK",
  type: "Full Tuition & Stipend",
  deadline: "January 15, 2026",
  duration: "3-4 Years (PhD)",
  fee: 50,
  stipend: 20000,
  description:
    "The Global Innovator Scholarship is designed to support outstanding international students pursuing advanced research degrees in STEM fields. It covers all tuition fees and provides a generous annual stipend to cover living expenses.",

  details: {
    benefits: [
      "Full coverage of tuition fees.",
      "Annual tax-free stipend of £20,000.",
      "Research allowance up to £5,000.",
      "One-time travel and relocation allowance.",
    ],
    eligibility: [
      "Must be an international student (non-UK/EU national).",
      "Must hold a First Class Honours degree or equivalent.",
      "Must have applied for and received a conditional offer for a full-time PhD program.",
      "Excellent academic and research track record.",
    ],
    documents: [
      "Completed Online Application Form.",
      "Academic Transcripts (undergraduate and postgraduate).",
      "Two Letters of Recommendation (at least one academic).",
      "Detailed Research Proposal (2,000 words max).",
      "Proof of English Proficiency (IELTS/TOEFL).",
    ],
  },
};

const ScholarshipDetailsPage = () => {
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
              {scholarshipData.name}
            </h1>
            <div className="flex items-center text-xl text-gray-600">
              <FaUniversity className="mr-3 text-primary/70" />
              <span className="font-light">{scholarshipData.university}</span>
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
                {scholarshipData.description}
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
                  {scholarshipData.type}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaClock className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Duration
                </span>
                <span className="text-lg font-medium">
                  {scholarshipData.duration}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaMapMarkerAlt className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Location
                </span>
                <span className="text-lg font-medium">
                  {scholarshipData.location}
                </span>
              </div>
              <div className="flex flex-col items-start space-y-1">
                <FaCalendarAlt className="w-6 h-6 text-primary" />
                <span className="text-xs font-light text-gray-500 uppercase mt-2">
                  Deadline
                </span>
                <span className="text-lg font-medium text-error">
                  {scholarshipData.deadline.split(",")[0]}
                </span>
              </div>
            </div>

            {/* 3. Tabs (Minimalist Design) */}
            <div className="space-y-6">
              <div className="tabs tabs-boxed bg-gray-50 p-2 rounded-lg">
                <input
                  type="radio"
                  name="details_tabs_min"
                  id="tab_benefits_m"
                  className="tab hidden"
                  defaultChecked
                />
                <label
                  htmlFor="tab_benefits_m"
                  className="tab text-base font-medium"
                >
                  Benefits
                </label>

                <input
                  type="radio"
                  name="details_tabs_min"
                  id="tab_eligibility_m"
                  className="tab hidden"
                />
                <label
                  htmlFor="tab_eligibility_m"
                  className="tab text-base font-medium"
                >
                  Eligibility
                </label>

                <input
                  type="radio"
                  name="details_tabs_min"
                  id="tab_documents_m"
                  className="tab hidden"
                />
                <label
                  htmlFor="tab_documents_m"
                  className="tab text-base font-medium"
                >
                  Documents
                </label>
              </div>

              {/* Tab Content Area (Visible content replaces the previous content) */}
              <div className="tab-content">
                {/* Benefits Content (Show when defaultChecked) */}
                <div
                  className="hidden peer-checked:block space-y-3"
                  data-tab-id="tab_benefits_m"
                >
                  <ul className="space-y-4">
                    {scholarshipData.details.benefits.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700 text-lg"
                      >
                        <FaCircleCheck className="text-success mt-1 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility Content (Show when checked) */}
                <div
                  className="hidden peer-checked:block space-y-3"
                  data-tab-id="tab_eligibility_m"
                >
                  <ul className="space-y-4">
                    {scholarshipData.details.eligibility.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700 text-lg"
                      >
                        <FaCircleCheck className="text-warning mt-1 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents Content (Show when checked) */}
                <div
                  className="hidden peer-checked:block space-y-3"
                  data-tab-id="tab_documents_m"
                >
                  <ul className="space-y-4">
                    {scholarshipData.details.documents.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700 text-lg"
                      >
                        <FaFileAlt className="text-info mt-1 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                <span className="text-3xl font-extrabold text-primary block">
                  £{scholarshipData.stipend.toLocaleString()}
                </span>
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
                    Not Required
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
