let { fakeHouseData }  = require('./generate_fake_data.js');
const db = require('./mysql.js');
let entries = 0;
let completions = 0;
let rounds = 10000;

// used to display seeding time in minutes and seconds
const getMinutes = (millis) => {
  let minutes = Math.floor((millis / 60000));
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10) ? '0': ''}${seconds}`;
};

const batchInsert = async () => {
  let houseData = fakeHouseData(1000);
  return await db.insert(houseData).into('houses')
    .then((res)=> {
    entries += 1000;
    console.log('RESULT FROM INSERTION', res);
    console.log(`successfully inserted ${entries} records`);
    completions++;
  }).catch((error) => {
    console.error('unable to records into the database', error)
  });
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
  }).then(async () => {
    console.time('batchInsert');
    let start = Date.now();
    // need to create an if condition
    while (completions < rounds) {
      await batchInsert();
    }
    let end = Date.now() - start;
    let totalTime = getMinutes(end);
    console.log(`SUCCESS it took ${totalTime}`);
    console.timeEnd('batchInsert');
  }).finally(() => {
    db.destroy();
  })
}).catch((error) => {
  console.error('COULD NOT DROP Database', error);
});

module.exports = db;
