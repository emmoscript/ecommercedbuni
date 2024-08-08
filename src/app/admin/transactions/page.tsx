"use client";

import React, { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  id: string;
  date: string;
  amount: string;
  status: string;
  method: string;
  description: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: number;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/get_transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
        <h2 className="text-3xl text-gray-800 mb-6">Transactions</h2>
        <div className="relative h-[calc(100vh-180px)] overflow-y-auto">
          
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-t border-[#ececec]">
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Payment Method</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">{txn.id}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.date}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.amount}</td>
                  <td className={`py-3 px-4 ${txn.status === "Completed" ? "text-green-600" : txn.status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                    {txn.status}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{txn.method}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.description}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.customer}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.email}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.phone}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.address}</td>
                  <td className="py-3 px-4 text-gray-700">{txn.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
