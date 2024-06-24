import MoodEntryItem from './MoodEntryItem';

const MoodEntryList = ({ entries }) => {
  const groupedEntries = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      {Object.keys(groupedEntries).map((date) => (
        <div key={date} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 bg-blue-100 p-2 rounded">
            {date === new Date().toLocaleDateString() ? 'Today' : date}
          </h3>
          {groupedEntries[date].map((entry) => (
            <MoodEntryItem key={entry.$id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MoodEntryList;
