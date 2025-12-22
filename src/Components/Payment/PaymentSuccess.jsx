import { Link, useSearchParams } from "react-router";
import { FaCheckCircle, FaClipboardList, FaHome } from "react-icons/fa";
import Confetti from "react-confetti"; // Optional: npm install react-confetti
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((response) => {
          console.log("Payment Status:", response.data);
          setPaymentInfo({
            transactionId: response.data.transactionId,
            trackingId: response.data.trackingId,
          });
        })
        .catch((error) => {
          console.error("Error fetching payment status:", error);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-100 px-4">
      <Confetti numberOfPieces={200} recycle={false} />

      <div className="max-w-md w-full text-center p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-success text-8xl animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-6">
          Your application has been submitted and is now being processed.
        </p>

        {/* Transaction Box */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-dashed border-gray-300">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
            Transaction ID
          </p>
          <p className="text-lg font-mono font-bold text-primary break-all">
            {paymentInfo?.transactionId || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-dashed border-gray-300">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
            Application Tracking ID
          </p>
          <p className="text-lg font-mono font-bold text-primary break-all">
            {paymentInfo?.trackingId || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/applied-scholarships"
            className="btn btn-primary flex items-center gap-2"
          >
            <FaClipboardList />
            View My Applications
          </Link>

          <Link
            to="/"
            className="btn btn-outline btn-secondary flex items-center gap-2"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
