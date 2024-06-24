"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { databases, account } from '@/lib/appwrite';
import { Query } from 'appwrite';
import MoodEntryItem from '@/components/MoodEntryItem';
import MoodChart from '@/components/MoodChart';
import { Collapse } from 'react-collapse';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MoodPage = () => {
  const [entries, setEntries] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [openTabs, setOpenTabs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await account.get();
        const userId = user.$id;
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID,
          [Query.equal('user_id', userId)]
        );
        setEntries(response.documents);

        // Prepare data for the chart
        const data = response.documents.map(entry => ({
          date: new Date(entry.date).getDate(),
          mood: entry.mood,
        }));
        setChartData(data);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to fetch mood entries.');
      }
    };

    fetchData();
  }, []);

  const groupByDate = (entries) => {
    return entries.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
  };

  const toggleTab = (date) => {
    setOpenTabs((prev) => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const groupedEntries = groupByDate(entries);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Your Moods</h1>
      <div className="space-y-4">
        {Object.keys(groupedEntries).map((date) => (
          <div key={date} className="mb-4">
            <button
              onClick={() => toggleTab(date)}
              className="w-full flex justify-between items-center text-left bg-blue-600 text-white py-2 px-4 rounded"
            >
              {date}
              {openTabs[date] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <Collapse isOpened={!!openTabs[date]}>
              <div className="mt-2 space-y-4">
                {groupedEntries[date].map((entry) => (
                  <MoodEntryItem key={entry.$id} entry={entry} />
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
      <MoodChart data={chartData} />
    </div>
  );
};

export default MoodPage;
