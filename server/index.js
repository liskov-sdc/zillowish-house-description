const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./../database/mysql.js');
const port = 3001;
// const House = require('./../database/mongo.js');

app.use(cors());
app.use('/', express.static(__dirname + '/./../client/dist'));
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.get('/houses/:id', (req, res) => {
  const { id } = req.params;
  db.select('street','city','state','zipcode', 'description')
    .from('houses')
    .where('id', id)
    .then((response) => {
      console.log('SUCCESS Here the House data:', response[0]);
      res.status(200).json(response)
    })
    .catch((error) => {
      console.error('unable to perform query in server', error);
    });
  });

  // THIS ENDPOINT WILL NEED REFACTORING AFTER MYSQL MIGRATION
  app.get('/prices/:id', (req, res) => {
    const { id } = req.params;
    db.select('price').from('houses').where('id', id)
      .then((response) => {
      console.log('SUCCESS Here the pricee data:', response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error('unable to perform query in server', error);
      res.status(404).send('Error in prices route')
    });
});

module.exports = app; // make available for testing