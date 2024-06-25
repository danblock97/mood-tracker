"use client";

import { useState, useEffect } from 'react';
import { databases, account, Query } from '@/lib/appwrite';
import { toast } from 'react-toastify';

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
          [Query.equal('user_id', user.$id)]
        );
        setGoals(response.documents);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch goals');
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="mt-8 max-w-md mx-auto p-4 bg-white rounded-lg">
      <h2 className="text-2xl mb-4">Your Goals</h2>
      {goals.map((goal) => (
        <div key={goal.$id} className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">{goal.title}</h4>
          <p className="text-gray-600">{new Date(goal.target_date).toLocaleString()}</p>
          <p>{goal.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewGoals;
