import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';

const MoodChart = ({ data }) => {
  const moodColors = {
    happy: '#00C49F',
    good: '#0088FE',
    meh: '#FFBB28',
    bad: '#FF8042',
    awful: '#FF0000',
  };

  const moodIcons = {
    happy: '😊',
    good: '🙂',
    meh: '😐',
    bad: '😔',
    awful: '😢',
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl mb-4">Mood Over the Last 30 Days</h2>
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              dataKey="mood"
              type="category"
              tickFormatter={(tick) => moodIcons[tick]}
            />
            <Tooltip
              formatter={(value, name) => [moodIcons[value], 'Mood']}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Bar dataKey="mood" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={moodColors[entry.mood]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodChart;
