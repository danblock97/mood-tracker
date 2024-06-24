"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { databases, account } from '@/lib/appwrite';

const GoalSetting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [goalId, setGoalId] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const goalId = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const targetDate = searchParams.get('target_date');

    if (goalId) {
      setGoalId(goalId);
      setTitle(title);
      setDescription(description);
      setTargetDate(targetDate);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await account.get();
      const newGoal = {
        title,
        description,
        target_date: targetDate,
        is_completed: false,
        user_id: user.$id,
      };

      if (goalId) {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
          goalId,
          newGoal
        );
        toast.success('Goal updated successfully');
      } else {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
          'unique()',
          newGoal
        );
        toast.success('Goal added successfully');
      }

      router.push('/your-goals');
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${goalId ? 'update' : 'add'} goal`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-full"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Target Date</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        {goalId ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
};

export default GoalSetting;
