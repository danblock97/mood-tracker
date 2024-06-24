import MoodChart from './MoodChart';

const MoodEntryItem = ({ entry }) => {
  const { mood, activities, note, date } = entry;

  const moodColors = {
    rad: 'bg-green-500',
    good: 'bg-blue-500',
    meh: 'bg-gray-500',
    bad: 'bg-orange-500',
    awful: 'bg-red-500',
  };

  const activityImageMapping = {
    'family': 'family.png',
    'friends': 'friends.png',
    'date': 'date.png',
    'exercise': 'exercise.png',
    'sport': 'sport.png',
    'relax': 'relax.png',
    'movies': 'movies.png',
    'gaming': 'gaming.png',
    'reading': 'reading.png',
    'cleaning': 'cleaning.png',
    'sleeping early': 'sleeping-early.png',
    'eating healthy': 'eating-healthy.png',
    'shopping': 'shopping.png',
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 ${moodColors[mood]} flex items-center justify-center rounded-full`}>
          <img src={`/images/${mood}.png`} alt={mood} className="w-8 h-8" />
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold">{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
          <p className="text-gray-500">{new Date(date).toLocaleTimeString()}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-2">
        {activities.map((activity) => (
          <div key={activity} className="flex items-center mr-2 mb-2">
            <img src={`/images/${activityImageMapping[activity]}`} alt={activity} className="w-6 h-6 mr-1" />
            <span className="text-sm text-gray-500">{activity}</span>
          </div>
        ))}
      </div>
      {note && <p className="text-gray-700">{note}</p>}
    </div>
  );
};

export default MoodEntryItem;
