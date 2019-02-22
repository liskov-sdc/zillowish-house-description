const facker = require('faker');

function makeHouseEntry(id) {

  let house = {
    id: id,
    street: facker.address.streetAddress(),
    city: facker.address.city(),
    state: facker.address.stateAbbr(),
    zipcode: facker.address.zipCode(),
    description: facker.lorem.paragraphs(2)
  }

  return house;

}

function makePriceEntry(id) {
  let price = {
    id: id,
    price: facker.commerce.price(200000, 2000000, 0)
  }
  return price
}

let fakeHouseData = [...Array(100).keys()].map(x => ++x).map(id => makeHouseEntry(id));
let fakePriceData = [...Array(100).keys()].map(x => ++x).map(id => makePriceEntry(id));

module.exports = {fakeHouseData, fakePriceData};

