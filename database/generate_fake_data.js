const { addresses, cities, states, descriptions } = require('./dataStorage.js');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const grabRandomItem = (array) => {
  if (array.length < 1) {
    return '';
  } else {
    return array[Math.floor((Math.random() * array.length))];
  }
};

const makeHouseEntry = () => {
  let house = {
    street: grabRandomItem(addresses),
    city: grabRandomItem(cities),
    state: grabRandomItem(states),
    zipcode: JSON.stringify(getRandomInt(10000, 99999)),
    description: grabRandomItem(descriptions),
    price: getRandomInt(2000000, 20000000),
  };
  return house;
}


const fakeHouseData = (rounds=100) => {
  let results = [];
  for (let i = 0; i < rounds; i++) {
    results.push(makeHouseEntry());
  }
  return results;
};



module.exports = fakeHouseData;
