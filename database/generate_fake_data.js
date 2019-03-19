const faker = require('faker');

function makeHouseEntry(id) {

  let house = {
    id: id,
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipcode: faker.address.zipCode(),
    description: faker.lorem.paragraphs(2)
  }

  return house;

}

function makePriceEntry(id) {
  let price = {
    id: id,
    price: faker.commerce.price(200000, 2000000, 0)
  };
  return price;
}

let fakeHouseData = [...Array(100).keys()].map(x => ++x).map(id => makeHouseEntry(id));
let fakePriceData = [...Array(100).keys()].map(x => ++x).map(id => makePriceEntry(id));

module.exports = { fakeHouseData, fakePriceData };
