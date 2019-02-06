const Sequelize = require('sequelize');
const password = require('./../config.js');

const sequelize = new Sequelize('zillow', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const House = sequelize.define('house', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = House;
