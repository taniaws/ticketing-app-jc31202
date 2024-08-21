"use client"

import React from 'react';
import axios from '@/helper/axiosInstance';
import { UserContext } from '@/context/UserContext';

interface TransactionType {
  id: number;
  amount: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  event: {
    id: number;
    namaEvent: string;
  };
}

const Transactions: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState<TransactionType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/api/dashboard/getTransaction/${user?.email}`);
      setTransactions(data.data);
      console.log("TRANSACTIONS FROM SET TRANSACTIONS::", data.data)
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  React.useEffect(() => {
    if (user?.email) {
        const timer = setTimeout(() => {
            fetchTransactions();
        }, 500);

        return () => clearTimeout(timer);
    }
}, [user?.email]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Attendee Transactions</h1>
      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.map((transaction, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <span className="font-bold">{transaction.user.name}</span> booked a ticket for 
                <span className="font-bold"> {transaction.event.namaEvent}</span>
              </p>
              <p className="text-gray-500">Amount Paid: ${transaction.amount}</p>
              <p className="text-gray-500">Date: {new Date(transaction.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found for your events.</p>
      )}
    </div>
  );
};

export default Transactions;
