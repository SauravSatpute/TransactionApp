const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Item = sequelize.define('Item', {
  id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true
  },
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description:{
    type:DataTypes.STRING
  },
  category:{
    type:DataTypes.STRING
  },
  image:{
    type:DataTypes.STRING
  },
  sold: {
    type:DataTypes.BOOLEAN
  },
  dateOfSale: {
    type: DataTypes.DATE
  }
});

const initDb = async () => {
  await sequelize.sync();
};

module.exports = {
  Item,
  initDb
};
