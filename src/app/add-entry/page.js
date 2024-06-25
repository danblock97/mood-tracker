import MoodEntry from '@/components/MoodEntry';

const AddEntryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Add a New Mood Entry</h1>
      <div className="w-full max-w-xl">
        <MoodEntry />
      </div>
    </div>
  );
};

export default AddEntryPage;
