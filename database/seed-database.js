const fakeData = require('./generate_fake_data.js');
const House = require('./index.js');

House.sync({force: true}).then(() => {
  return fakeData.forEach(row => {
    House.create(row);
  })

});