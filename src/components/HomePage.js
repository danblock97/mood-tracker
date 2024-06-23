import { useState, useEffect } from 'react';
import MoodEntry from './MoodEntry';
import DiaryEntry from './DiaryEntry';
import GoalSetting from './GoalSetting';
import MoodChart from './Chart';
import MoodCalendar from './Calendar';
import { databases } from '@/lib/appwrite';

const HomePage = () => {
  const [moodData, setMoodData] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID
        );
        const data = response.documents.map(doc => ({
          date: new Date(doc.date).toLocaleDateString(),
          mood: doc.mood,
          activities: doc.activities,
          note: doc.note,
        }));
        setMoodData(data);

        const events = response.documents.map(doc => ({
          title: doc.mood,
          start: new Date(doc.date),
          end: new Date(doc.date),
        }));
        setCalendarEvents(events);
      } catch (error) {
        console.error('Failed to fetch mood data', error);
      }
    };

    fetchMoodData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-8">Welcome to Mood Catcher</h1>
      <MoodEntry />
      <DiaryEntry />
      <GoalSetting />
      <MoodChart data={moodData} />
      <MoodCalendar events={calendarEvents} />
    </div>
  );
};

export default HomePage;
