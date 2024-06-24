"use client";

import { useState, useEffect } from 'react';
import { databases, account, Query } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const router = useRouter();

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

  const handleToggleCompletion = async (goal) => {
    try {
      const updatedGoal = { ...goal, is_completed: !goal.is_completed };
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
        goal.$id,
        updatedGoal
      );
      setGoals(goals.map((g) => (g.$id === goal.$id ? updatedGoal : g)));
    } catch (error) {
      console.error(error);
      toast.error('Failed to update goal');
    }
  };

  const handleEditGoal = (goal) => {
    const { $id, title, description, target_date } = goal;
    router.push(
      `/goals?id=${$id}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(
        description
      )}&target_date=${target_date}`
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Your Goals</h2>
      {goals.map((goal) => (
        <div key={goal.$id} className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">{goal.title}</h4>
          <p>{goal.description}</p>
          <p className="text-gray-600">Target Date: {new Date(goal.target_date).toLocaleDateString()}</p>
          <button
            onClick={() => handleToggleCompletion(goal)}
            className={`py-1 px-2 rounded ${
              goal.is_completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {goal.is_completed ? 'Completed' : 'Mark as Complete'}
          </button>
          <button
            onClick={() => handleEditGoal(goal)}
            className="py-1 px-2 ml-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewGoals;
