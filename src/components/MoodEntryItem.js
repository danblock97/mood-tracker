const MoodEntryItem = ({ entry }) => {
  const { mood, activities, note, date } = entry;

  const moodColors = {
    rad: 'text-green-500',
    good: 'text-blue-500',
    meh: 'text-gray-500',
    bad: 'text-orange-500',
    awful: 'text-red-500',
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className={`w-10 h-10 ${moodColors[mood]} flex items-center justify-center text-2xl`}>
            <img src={`/images/${mood}.png`} alt={mood} className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <p className={`text-lg md:text-xl ${moodColors[mood]}`}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
            <p className="text-gray-500">{new Date(date).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm md:text-base">{activities.join(', ')}</div>
      </div>
      {note && <p className="mt-2 text-gray-700">{note}</p>}
    </div>
  );
};

export default MoodEntryItem;
