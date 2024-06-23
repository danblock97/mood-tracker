import { useState } from 'react';
import { toast } from 'react-toastify';
import { databases } from '@/lib/appwrite';

const DiaryEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_ENTRIES_COLLECTION_ID,
        'unique()',
        {
          title,
          content,
          date: new Date().toISOString(),
        }
      );
      toast.success('Diary entry saved successfully');
      setEntries([...entries, { title, content, date: new Date().toISOString() }]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save diary entry');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Diary Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border rounded w-full"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Save Entry
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl mb-4">Previous Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h4 className="text-lg font-semibold">{entry.title}</h4>
            <p className="text-gray-600">{new Date(entry.date).toLocaleString()}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntry;
