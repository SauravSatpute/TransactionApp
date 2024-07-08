import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/statistics`, {
        params: { month }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow-md flex justify-around">
      <div className="text-center">
        <h2 className="text-xl font-bold">Total Sales</h2>
        <p className="text-2xl">${stats.totalSaleAmount}</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">Total Sold Items</h2>
        <p className="text-2xl">{stats.totalSoldItems}</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">Total Not Sold Items</h2>
        <p className="text-2xl">{stats.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;