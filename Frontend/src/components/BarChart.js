import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/barchart?month=${month}`);
        const data = response.data;

        // Ensure data is an array and not empty
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Data format is invalid or empty');
        }

        // Extract labels and counts from data
        const labels = data.map(item => String(item.range)); // Ensure range is converted to string
        console.log(labels)
        const counts = data.map(item => item.count);
        console.log(counts)

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Number of Items',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching the bar chart data', error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      {chartData && (
        <Bar
          key={Math.random()} // Unique key to prevent canvas reuse error
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              yAxis: {
                beginAtZero: true,
                grid: {
                  display: true,
                },
              },
              xAxis: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
