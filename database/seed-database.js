const fakeHouseData  = require('./generate_fake_data.js');
const db = require('./mysql.js');

const getMinutes = (millis) => {
  let minutes = Math.floor((millis / 60000));
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10) ? '0': ''}${seconds} `
}

console.time('seed')
const houseData = fakeHouseData(10000000);
db.schema.dropTableIfExists('houses').then((exists) => {
  return db.schema.createTable('houses', (t) => {
    t.increments('id').primary();
    t.string('street', 255);
    t.string('city', 255);
    t.string('state', 2);
    t.string('zipcode', 6);
    t.text('description');
    t.integer('price');
  }).then(() => {
    let houseData = fakeHouseData(10000000);
    let chunk = 1000;
    let start = Date.now();

    console.time('batchInsertTimer');
    db.transaction((tr) => {
      return db.batchInsert('houses', houseData, chunk)
      .transacting(tr)
    }).then((result) => {
      console.timeEnd('batchInsertTimer');
      let end = Date.now() - start;
      let totalTime = getMinutes(end);
      console.log(`SUCCESS it took ${totalTime}`);
      console.log('FOUND RESULT', result);
    })
    .catch((error) => {
      console.error('NOT ABLE TO SEED DB', error);
    });
  }).finally(() => {
    db.destroy();
  })
}).catch((error) => {
  console.error('COULD NOT DROP Database', error);
});
console.timeEnd('seed')

module.exports = db;

// return db('houses').insert(houseData)
//   .catch((err) => {
  //     console.log('found an error in db seeding', err);
  //   }).then((results) => {
    //     if (results) {
      //       console.log('INSERTION SUCCESS', results);
      //     }
      //   });

      // const db = require('./index.js');

      // async function seedDatabase() {

      //   await db.House.sync({ force: true }).then(() => {
      //     return fakeHouseData.forEach((row) => {
      //       db.House.create(row);
      //     })
      //   });

      //   await db.Price.sync({ force: true }).then(() => {
      //     return fakePriceData.forEach((row) => {
      //       db.Price.create(row);
      //     })
      //   });

      //   await db.sequelize.close();
      // }

      // seedDatabase();