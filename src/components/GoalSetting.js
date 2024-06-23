import { useState } from 'react';
import { toast } from 'react-toastify';
import { databases } from '@/lib/appwrite';

const GoalSetting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [goals, setGoals] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGoal = { title, description, targetDate, isCompleted: false };
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
        'unique()',
        newGoal
      );
      toast.success('Goal added successfully');
      setGoals([...goals, newGoal]);
      setTitle('');
      setDescription('');
      setTargetDate('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add goal');
    }
  };

  const handleToggleCompletion = (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, isCompleted: !goal.isCompleted } : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Set Your Goals</h2>
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
          Add Goal
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl mb-4">Your Goals</h3>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h4 className="text-lg font-semibold">{goal.title}</h4>
            <p>{goal.description}</p>
            <p className="text-gray-600">Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
            <button
              onClick={() => handleToggleCompletion(index)}
              className={`py-1 px-2 rounded ${
                goal.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {goal.isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalSetting;
