import React from "react";
import { FaTimesCircle, FaArrowLeft, FaRedo } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <FaTimesCircle className="text-6xl text-error mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your payment was not completed. Don’t worry — no money has been
          deducted from your account.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <FaRedo /> Try Payment Again
          </button>

          <Link
            to="/dashboard"
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-6">
          If you continue to face issues, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
