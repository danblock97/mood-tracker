import { useState } from 'react';

const MoodEntry = () => {
  const [mood, setMood] = useState('');
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState('');

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleActivitiesChange = (event) => {
    const value = event.target.value;
    setActivities((prev) => (prev.includes(value) ? prev.filter((activity) => activity !== value) : [...prev, value]));
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">How are you?</h2>
      <div className="mb-4">
        <label className="block mb-2">Mood</label>
        <select value={mood} onChange={handleMoodChange} className="p-2 border rounded w-full">
          <option value="happy">😊 Happy</option>
          <option value="good">🙂 Good</option>
          <option value="meh">😐 Meh</option>
          <option value="sad">😔 Sad</option>
          <option value="awful">😢 Awful</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">What have you been up to?</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input type="checkbox" value="family" onChange={handleActivitiesChange} className="form-checkbox" />
            <span className="ml-2">Family</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input type="checkbox" value="friends" onChange={handleActivitiesChange} className="form-checkbox" />
            <span className="ml-2">Friends</span>
          </label>
          {/* Add more checkboxes for other activities */}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Add a note</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="p-2 border rounded w-full" rows="4"></textarea>
      </div>
      <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-4 rounded">Save Mood</button>
    </div>
  );
};

export default MoodEntry;
