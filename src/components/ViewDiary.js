"use client";

import { useState, useEffect } from 'react';
import { databases, account, Query } from '@/lib/appwrite';
import { toast } from 'react-toastify';

const ViewDiary = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_ENTRIES_COLLECTION_ID,
          [Query.equal('user_id', user.$id)]
        );
        setEntries(response.documents);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch diary entries');
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="mt-8 max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Diary Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div key={entry.$id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h4 className="text-xl font-semibold mb-2 text-blue-700">{entry.title}</h4>
            <p className="text-gray-500 mb-4">{new Date(entry.date).toLocaleString()}</p>
            <p className="text-gray-700">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDiary;
