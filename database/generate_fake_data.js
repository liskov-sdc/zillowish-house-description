const facker = require('faker');
const fs = require('fs');

function makeHouseEntry(id) {

  let house = {
    id: id,
    street: facker.address.streetAddress(),
    city: facker.address.city(),
    state: facker.address.stateAbbr(),
    zipcode: facker.address.zipCode(),
    description: facker.lorem.paragraphs(2),
    price: facker.commerce.price(200000, 2000000, 0)
  }

  return house;

}

let fakeData = [...Array(100).keys()].map(x => ++x).map(id => makeHouseEntry(id));
// let fakeData = JSON.stringify({houses: [...Array(100).keys()].map(x => ++x).map(id => makeHouseEntry(id))});

// fs.writeFile(__dirname + '/fakeData.json',fakeData, (err) => {
//   if (err) {
//     console.error(err)
//   }
//   console.log('success');
// });
module.exports = fakeData;

