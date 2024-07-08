const express = require('express');
const { initDb, Item } = require('./models');
const fetchAndSeedData = require('./seed');
const { Op, fn, col, or,Sequelize } = require('sequelize');
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post('/initialize', async (req, res) => {
  try {
    await fetchAndSeedData();
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/transactions', async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
  
    const offset = (page - 1) * perPage;
    const whereClause = {
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn('strftime', '%m', Sequelize.col('dateOfSale')),
          month < 10 ? `0${month}` : `${month}`
        ),
        search ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { price: { [Op.like]: `%${search}%` } }
          ]
        } : {}
      ]
    };
  
    try {
      const { count, rows } = await Item.findAndCountAll({
        where: whereClause,
        offset,
        limit: parseInt(perPage)
      });
  
      res.json({
        transactions: rows,
        totalPages: Math.ceil(count / perPage)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




app.get('/statistics', async (req, res) => {
    const { month } = req.query;
  
    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }
  
    try {
      // Parse the month from the query parameter
      const parsedMonth = parseInt(month);
      if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({ message: 'Invalid month parameter' });
      }
  
      // Query items where the dateOfSale falls within the specified month (regardless of the year)
      const totalSaleAmount = await Item.sum('price', {
        where: {
          sold: true,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('strftime', '%m', Sequelize.col('dateOfSale')),
              parsedMonth < 10 ? `0${parsedMonth}` : `${parsedMonth}`
            )
          ]
        }
      });
  
      const totalSoldItems = await Item.count({
        where: {
          sold: true,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('strftime', '%m', Sequelize.col('dateOfSale')),
              parsedMonth < 10 ? `0${parsedMonth}` : `${parsedMonth}`
            )
          ]
        }
      });
  
      const totalNotSoldItems = await Item.count({
        where: {
          sold: false,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('strftime', '%m', Sequelize.col('dateOfSale')),
              parsedMonth < 10 ? `0${parsedMonth}` : `${parsedMonth}`
            )
          ]
        }
      });
  
      res.json({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



  app.get('/barchart', async (req, res) => {
    const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: 'Month parameter is required' });
  }

  try {
    // Build the query to match transactions based on the month irrespective of the year
    const transactions = await Item.findAll({
      where: Sequelize.where(
        Sequelize.fn('strftime', '%m', Sequelize.col('dateOfSale')),
        month < 10 ? `0${month}` : `${month}`
      ),
      attributes: ['price']
    });

    const priceRanges = [
      { range: '0-100', count: 0 },
      { range: '101-200', count: 0 },
      { range: '201-300', count: 0 },
      { range: '301-400', count: 0 },
      { range: '401-500', count: 0 },
      { range: '501-600', count: 0 },
      { range: '601-700', count: 0 },
      { range: '701-800', count: 0 },
      { range: '801-900', count: 0 },
      { range: '901-above', count: 0 }
    ];

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) {
        priceRanges[0].count += 1;
      } else if (price <= 200) {
        priceRanges[1].count += 1;
      } else if (price <= 300) {
        priceRanges[2].count += 1;
      } else if (price <= 400) {
        priceRanges[3].count += 1;
      } else if (price <= 500) {
        priceRanges[4].count += 1;
      } else if (price <= 600) {
        priceRanges[5].count += 1;
      } else if (price <= 700) {
        priceRanges[6].count += 1;
      } else if (price <= 800) {
        priceRanges[7].count += 1;
      } else if (price <= 900) {
        priceRanges[8].count += 1;
      } else {
        priceRanges[9].count += 1;
      }
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    
  });


  app.get('/piechart', async (req, res) => {
    const { month } = req.query;
  
    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }
  
    try {
        const transactions = await Item.findAll({
            where: {
                [Op.or]: [
                    {
                    dateOfSale: {
                    [Op.gte]: new Date(2022, parseInt(month)-1, 1),
                    [Op.lt]: new Date(2022, parseInt(month), 1)
                    }
                    },
                    {
                    dateOfSale: {
                    [Op.gte]: new Date(2021, parseInt(month)-1, 1),
                    [Op.lt]: new Date(2021, parseInt(month), 1)
                    }
                    },
                    {
                    dateOfSale: {
                    [Op.gte]: new Date(2020, parseInt(month)-1, 1),
                    [Op.lt]: new Date(2020, parseInt(month), 1)
                    }
                    },
                    {
                    dateOfSale: {
                    [Op.gte]: new Date(2019, parseInt(month)-1, 1),
                    [Op.lt]: new Date(2019, parseInt(month), 1)
                    }
                    },
                    {
                    dateOfSale: {
                    [Op.gte]: new Date(2019, parseInt(month)-1, 1),
                    [Op.lt]: new Date(2019, parseInt(month), 1)
                    }
                    }
                    
                    ]
                }
          });

          
      
          // Process transactions to get unique categories and their counts
          const categoryCounts = {};
          transactions.forEach(transaction => {
            const category = transaction.category;
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          });
      
          // Format the response
          const formattedData = Object.keys(categoryCounts).map(category => ({
            category,
            count: categoryCounts[category]
          }));
      
          // Send the formatted data as JSON response
          res.json(formattedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  };



  app.get('/combined-data', async (req, res) => {
    const { month } = req.query;
  
    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }
  
    try {
      // Define the API endpoints with the month parameter
      const statisticsUrl = `http://localhost:3000/statistics?month=${month}`;
      const barChartUrl = `http://localhost:3000/barchart?month=${month}`;
      const pieChartUrl = `http://localhost:3000/piechart?month=${month}`;
  
      // Fetch data from all three APIs concurrently
      const [statisticsData, barChartData, pieChartData] = await Promise.all([
        fetchData(statisticsUrl),
        fetchData(barChartUrl),
        fetchData(pieChartUrl)
      ]);
  
      // Combine the responses
      const combinedData = {
        statistics: statisticsData,
        barChart: barChartData,
        pieChart: pieChartData
      };
  
      // Send the combined data as JSON response
      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch combined data' });
    }
  });


  
  

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();
