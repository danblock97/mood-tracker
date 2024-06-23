import { useState } from 'react';

const DiaryEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { title, content, date: new Date().toISOString() };
    setEntries([...entries, newEntry]);
    setTitle('');
    setContent('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
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
            rows="6"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Entry
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
