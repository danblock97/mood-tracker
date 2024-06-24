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
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Your Diary Entries</h2>
      {entries.map((entry) => (
        <div key={entry.$id} className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">{entry.title}</h4>
          <p className="text-gray-600">{new Date(entry.date).toLocaleString()}</p>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewDiary;
