const fakeData = require('./generate_fake_data.js');
const db = require('./index.js');

async function seedDatabase() {

  await db.House.sync({ force: true }).then(() => {
    return fakeData.fakeHouseData.forEach(row => {
      db.House.create(row);
    })
  });

  await db.Price.sync({ force: true }).then(() => {
    return fakeData.fakePriceData.forEach(row => {
      db.Price.create(row);
    })
  });

  await db.sequelize.close();
}

seedDatabase();