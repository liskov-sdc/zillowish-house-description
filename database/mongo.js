const mongoose = require('mongoose');
const fakeHouseData = require('./generate_fake_data');
const db = mongoose.connection;
const Schema = mongoose.Schema;
let houseData = fakeHouseData(1000);

mongoose.connect('mongodb://localhost:27017/zillowDescription', { useNewUrlParser : true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('SUCCESS you connected to the mongodb');
  let count = 0;
  const repeatTimes = 9999;
  const houseSchema = new Schema({
    houseId: {type: Number, index: true},
    street: String,
    city: String,
    state: String,
    zipcode: String,
    description: String,
    price: Number,
  });
  const House = mongoose.model('House', houseSchema);
  console.time('mongo-seed');
  const insertHouseData = () => {
    House.estimatedDocumentCount().then((counter) => {
      console.log('COUNTER:', counter);
      for (var i = houseData.length - 1; i >= 0; i--) {
        houseData[i].houseId = counter + (i + 1);
      }
      return House.insertMany(houseData).then(() => {
        if (count < repeatTimes) {
          count++;
          return insertHouseData();
        } else {
          console.timeEnd('mongo-seed');
        }
      });
    }).then(() => {
      console.log('SUCCESSFULLY inserted records in the db');
    })
  };
  insertHouseData();
});


// module.exports = House;
