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
  db.select('*').from('houses').where('id', id)
    .then((response) => {
      console.log('SUCCESS Here the House data:', response);
      res.end();
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
      console.log('SUCCESS Here the House data:', response);
      res.end();
    })
    .catch((error) => {
      console.error('unable to perform query in server', error);
    });
});

module.exports = app; // make available for testing