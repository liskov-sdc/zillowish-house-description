const fakeHouseData  = require('./generate_fake_data.js');
const db = require('./mysql.js');
const houseData = fakeHouseData(10000000);

// used to display seeding time in minutes and seconds
const getMinutes = (millis) => {
  let minutes = Math.floor((millis / 60000));
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10) ? '0': ''}${seconds}`;
};

db.schema.dropTableIfExists('houses').then((exists) => {
  return db.schema.createTable('houses', (col) => {
    col.increments('id').primary().notNullable().unique().index();
    col.string('street', 255);
    col.string('city', 255);
    col.string('state', 2);
    col.string('zipcode', 6);
    col.text('description');
    col.integer('price');
  }).then(() => {
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

module.exports = db;
