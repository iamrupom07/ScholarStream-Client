import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ApplyScholarship = () => {
  const scholarship = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentInfo = {
      amount: scholarship?.applicationFees + scholarship?.serviceCharge || 30,

      scholarshipName: scholarship?.scholarshipName,
      universityName: scholarship?.universityName,

      // ✅ REQUIRED FOR DB
      userName: user?.displayName || "N/A",
      userEmail: user?.email,
      degree: scholarship?.degree || "N/A",
      scholarshipCategory: scholarship?.scholarshipCategory || "N/A",
      subjectCategory: scholarship?.subjectCategory || "N/A",
      scholarshipId: scholarship?._id,

      senderEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(
        error.response?.status === 401
          ? "Please log in again. Your session has expired."
          : "Payment failed to initiate."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-center text-[#1e3a5a] mb-8">
          Scholarship Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-medium text-gray-600">Phone</label>
              <input
                name="phone"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-gray-600">Photo</label>
              <input
                name="photo"
                type="file"
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-600">Address</label>
            <input
              name="address"
              type="text"
              className="input input-bordered   w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-medium text-gray-600">
                SSC Result
              </label>
              <input
                name="ssc"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-gray-600">
                HSC Result
              </label>
              <input
                name="hsc"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-bold">
              Total Fees: $
              {scholarship?.applicationFees + scholarship?.serviceCharge || 0}
            </h3>
            <p className="text-sm">
              Clicking "Pay Now" will redirect you to Stripe.
            </p>
          </div>

          <button
            type="submit"
            className="btn w-full bg-[#008080] hover:bg-[#006666] text-white border-none text-lg"
          >
            Pay & Apply Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyScholarship;
