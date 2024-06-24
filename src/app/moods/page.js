"use client";

import { useState, useEffect } from 'react';
import { databases } from '@/lib/appwrite';
import MoodEntryItem from '@/components/MoodEntryItem';
import { toast } from 'react-toastify';

const MoodsPage = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID
        );
        setMoodEntries(response.documents);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch mood entries:', error);
        toast.error('Failed to fetch mood entries.');
        setLoading(false);
      }
    };

    fetchMoodEntries();
  }, []);

  const groupEntriesByDate = (entries) => {
    return entries.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {});
  };

  const groupedEntries = groupEntriesByDate(moodEntries);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-4xl mb-8 text-center">Your Mood Tracker</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.keys(groupedEntries).map((date) => (
            <div key={date} className="mb-8">
              <div className="p-4 bg-blue-500 text-white rounded-t-lg">
                <h2 className="text-lg md:text-xl">{date}</h2>
              </div>
              <div className="p-4 bg-white rounded-b-lg shadow-md">
                {groupedEntries[date].map((entry) => (
                  <MoodEntryItem key={entry.$id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodsPage;
