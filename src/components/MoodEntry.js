"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { databases, account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { Permission, Role } from 'appwrite';

const MoodEntry = () => {
  const [userId, setUserId] = useState('');
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState('');
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        toast.error('Failed to fetch user information.');
      }
    };

    getUser();
  }, []);

  const handleMoodChange = (mood) => {
    setMood(mood);
    setStep(2);
  };

  const handleActivitiesChange = (event) => {
    const value = event.target.value;
    setActivities((prev) =>
      prev.includes(value) ? prev.filter((activity) => activity !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID,
        'unique()',
        {
          user_id: userId,
          mood,
          activities,
          note,
          date: new Date().toISOString(),
        },
        [
          Permission.write(Role.user(userId)),
          Permission.read(Role.users()),
          Permission.read(Role.users())
        ]
      );
      toast.success('Mood entry saved successfully');
      router.push('/moods'); // Redirect to moods page
    } catch (error) {
      console.error(error);
      toast.error('Failed to save mood entry');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8">
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl mb-4">How are you?</h2>
          <div className="flex justify-around mb-4">
            {['happy', 'good', 'meh', 'bad', 'awful'].map((m) => (
              <button key={m} onClick={() => handleMoodChange(m)} className="focus:outline-none">
                <img src={`/images/${m}.png`} alt={m} className="w-12 h-12" />
                <span className="block mt-2 text-sm">{m.charAt(0).toUpperCase() + m.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl mb-4">What have you been up to?</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              'family',
              'friends',
              'date',
              'exercise',
              'sport',
              'relax',
              'movies',
              'gaming',
              'reading',
              'cleaning',
              'sleep early',
              'eat healthy',
              'shopping',
            ].map((activity) => (
              <label key={activity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={activity}
                  onChange={handleActivitiesChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm">{activity.charAt(0).toUpperCase() + activity.slice(1)}</span>
              </label>
            ))}
          </div>
          <textarea
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            rows="4"
          />
          <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-4 rounded w-full">
            Save Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodEntry;
