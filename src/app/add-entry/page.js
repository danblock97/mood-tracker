import MoodEntry from '@/components/MoodEntry';

const AddEntryPage = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl mb-8 text-center">Add a New Mood Entry</h1>
      <MoodEntry />
    </div>
  );
};

export default AddEntryPage;
