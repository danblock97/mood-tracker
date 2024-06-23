import { useState } from 'react';
import { toast } from 'react-toastify';
import { databases } from '@/lib/appwrite';

const MoodEntry = () => {
  const [mood, setMood] = useState('');
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState('');

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleActivitiesChange = (event) => {
    const value = event.target.value;
    setActivities((prev) => (prev.includes(value) ? prev.filter((activity) => activity !== value) : [...prev, value]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID,
        'unique()',
        {
          mood,
          activities,
          note,
          date: new Date().toISOString(),
        }
      );
      toast.success('Mood entry saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save mood entry');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">How are you?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mood</label>
          <select value={mood} onChange={handleMoodChange} className="p-2 border rounded w-full">
            <option value="">Select mood</option>
            <option value="happy">😊 Happy</option>
            <option value="good">🙂 Good</option>
            <option value="meh">😐 Meh</option>
            <option value="sad">😔 Sad</option>
            <option value="awful">😢 Awful</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">What have you been up to?</label>
          <div>
            {['family', 'friends', 'date', 'exercise', 'relaxing', 'gaming', 'reading'].map((activity) => (
              <label key={activity} className="inline-flex items-center mr-4">
                <input type="checkbox" value={activity} onChange={handleActivitiesChange} className="form-checkbox" />
                <span className="ml-2">{activity.charAt(0).toUpperCase() + activity.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Add a note</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="p-2 border rounded w-full" rows="4"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Save Mood
        </button>
      </form>
    </div>
  );
};

export default MoodEntry;
