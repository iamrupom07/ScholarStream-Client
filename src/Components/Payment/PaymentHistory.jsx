import { useEffect, useState } from "react";

import { FaHistory, FaFileInvoiceDollar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/?email=${user.email}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching payments:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-base-100 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <FaHistory className="text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Payment History</h2>
          <p className="text-gray-500">Track all your transaction details</p>
        </div>
      </div>

      <div className="stats shadow w-full mb-8 bg-white border">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaFileInvoiceDollar className="text-3xl" />
          </div>
          <div className="stat-title">Total Payments</div>
          <div className="stat-value">{payments.length}</div>
          <div className="stat-desc">Successful transactions</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-10 bg-base-200 rounded-lg">
          <h3 className="text-xl font-bold text-gray-500">
            No Payment History Found
          </h3>
          <p>You haven't made any payments yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-base-200">
          <table className="table table-zebra bg-white">
            {/* Table Head */}
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td className="font-mono text-xs md:text-sm text-gray-600">
                    {payment.transactionId}
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>
                  <td className="font-bold text-gray-700">${payment.amount}</td>
                  <td>
                    <div className="badge badge-success gap-2 text-white p-3">
                      Success
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
