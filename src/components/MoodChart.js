import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const aggregateDataByDate = (data) => {
  const aggregatedData = {};

  data.forEach(entry => {
    const date = new Date(entry.date).toISOString().split('T')[0];
    if (!aggregatedData[date]) {
      aggregatedData[date] = { date, happy: 0, good: 0, meh: 0, bad: 0, awful: 0 };
    }
    if (entry.mood && aggregatedData[date][entry.mood] !== undefined) {
      aggregatedData[date][entry.mood]++;
    }
  });

  return Object.values(aggregatedData);
};

const MoodChart = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));
    const filtered = data.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
    const aggregated = aggregateDataByDate(filtered);
    setFilteredData(aggregated);
  }, [data]);

  const moodColors = {
    happy: '#00C49F',
    good: '#0088FE',
    meh: '#FFBB28',
    bad: '#FF8042',
    awful: '#FF0000',
  };

  const chartData = {
    labels: filteredData.map(entry => entry.date),
    datasets: [
      {
        label: 'Happy',
        data: filteredData.map(entry => entry.happy),
        backgroundColor: moodColors.happy,
      },
      {
        label: 'Good',
        data: filteredData.map(entry => entry.good),
        backgroundColor: moodColors.good,
      },
      {
        label: 'Meh',
        data: filteredData.map(entry => entry.meh),
        backgroundColor: moodColors.meh,
      },
      {
        label: 'Bad',
        data: filteredData.map(entry => entry.bad),
        backgroundColor: moodColors.bad,
      },
      {
        label: 'Awful',
        data: filteredData.map(entry => entry.awful),
        backgroundColor: moodColors.awful,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4 text-center">Monthly Mood Chart</h2>
      <div className="w-full h-64 md:h-96">
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Mood Count'
                },
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    const label = tooltipItem.dataset.label || '';
                    return `${label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MoodChart;
