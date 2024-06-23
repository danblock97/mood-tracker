import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const MoodChart = ({ data }) => (
  <div className="p-4 bg-white shadow-md rounded-lg mt-8">
    <h2 className="text-2xl mb-4">Mood Chart</h2>
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  </div>
);

export default MoodChart;
