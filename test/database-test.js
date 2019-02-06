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

test('There are 100 records in the house table', () => {
  return sequelize.query('select count(*) from houses;', { type: sequelize.QueryTypes.SELECT})
    .then(count => {
      expect(count[0].count).toBe(100);
    })
})