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

  const handleActivitiesChange = (activity) => {
    setActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
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

  const activityImageMapping = {
    'family': 'family.png',
    'friends': 'friends.png',
    'date': 'date.png',
    'exercise': 'exercise.png',
    'sport': 'sport.png',
    'relax': 'relax.png',
    'movies': 'movies.png',
    'gaming': 'gaming.png',
    'reading': 'reading.png',
    'cleaning': 'cleaning.png',
    'sleeping early': 'sleeping-early.png',
    'eating healthy': 'eating-healthy.png',
    'shopping': 'shopping.png',
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8">
      <div className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
        <h2 className="text-2xl mb-4 text-center">How are you?</h2>
        <div className="flex justify-around mb-4">
          {['happy', 'good', 'meh', 'bad', 'awful'].map((m) => (
            <button
              key={m}
              onClick={() => handleMoodChange(m)}
              className={`focus:outline-none flex flex-col items-center ${mood === m ? 'border-2 border-blue-600' : ''}`}
            >
              <img src={`/images/${m}.png`} alt={m} className="w-12 h-12" />
              <span className={`block mt-2 text-sm ${mood === m ? 'text-blue-600' : ''}`}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl mb-4 text-center">What have you been up to?</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Object.keys(activityImageMapping).map((activity) => (
              <button
                key={activity}
                onClick={() => handleActivitiesChange(activity)}
                className={`focus:outline-none flex flex-col items-center ${activities.includes(activity) ? 'border-2 border-blue-600' : ''}`}
              >
                <img src={`/images/${activityImageMapping[activity]}`} alt={activity} className="w-12 h-12" />
                <span className={`block mt-2 text-sm text-center ${activities.includes(activity) ? 'text-blue-600' : ''}`}>
                  {activity}
                </span>
              </button>
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
