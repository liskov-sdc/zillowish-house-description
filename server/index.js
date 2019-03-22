const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const db = require('./../database/index.js')
const cors = require('cors');

app.use(cors());
app.use('/', express.static(__dirname + '/./../client/dist'));
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.get('/houses/:id', (req, res) => {
  db.House.findAll(
    {where: {id: req.params.id}}
  ).then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    console.error(err);
    res.status(404).send()
  });
});

// THIS ENDPOINT WILL NEED REFACTORING AFTER MYSQL MIGRATION
app.get('/prices/:id', (req, res) => {
  db.Price.findAll(
    {where: {id: req.params.id}}
  ).then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    console.error(err);
    res.status(404).send()
  });
});

module.exports = app; // make available for testing