const axios = require('axios');
const { Item, initDb } = require('./models');

const fetchAndSeedData = async () => {
  try {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'; // Replace with the actual API URL
    const response = await axios.get(url);
    const data = response.data;

    console.log(data)

    for (const itemData of data) {
      await Item.create({
        id : itemData.id,
        title: itemData.title,
        price: itemData.price,
        description: itemData.description,
        category:itemData.category,
        image: itemData.image,
        sold: itemData.sold,
        dateOfSale:itemData.dateOfSale
      });
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// const seedData = async () => {
//     await initDb();

//     const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'; 
//     const response = await axios.get(url);
//     const data = response.data;

//     console.log(data)

//     for (const itemData of data) {
//         await Item.create({
//           id : itemData.id,
//           title: itemData.title,
//           price: itemData.price,
//           description: itemData.description,
//           category:itemData.category,
//           image: itemData.image,
//           sold: itemData.sold,
//           dateOfSale:itemData.dateOfSale
//         });
//       }
//   };
  
//   seedData().catch(error => console.error(error));



module.exports = fetchAndSeedData;
