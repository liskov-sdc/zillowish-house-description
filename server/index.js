const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./../database/mysql.js');
const port = 3001;

app.use(cors());
app.use('/', express.static(__dirname + '/./../client/dist'));
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/houses/:id', (req, res) => {
  const { id } = req.params;
  db.select('street','city','state','zipcode','description')
    .from('houses')
    .where('id', id)
    .then((response) => {
      console.log('SUCCESS Here the House data: ', response[0]);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error('unable to perform query in server', error);
      res.status(404).send('Invalid id in houses route');
    });
});

app.post('/houses/:id', (req, res) => {
  const { body } = req;
  db('houses')
    .insert(body, ['id'])
    .then((response) => {
      console.log('Found the response', response);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error adding new House record', error);
      res.sendStatus()
    });
});

app.get('/prices/:id', (req, res) => {
  const { id } = req.params;
  db.select('price').from('houses')
    .where('id', id)
    .then((response) => {
    console.log('SUCCESS Here the price data: ', response);
    res.status(200).json(response);
  })
  .catch((error) => {
    console.error('unable to perform query in server', error);
    res.status(404).send('Error in prices route');
  });
});

// Not needed. Houses endpoint handles this operation.
app.post('/prices/:id', (req, res) => {
  console.log('Inside post route');
  const { id } = req.params;
  const body = req.body;
  console.log('Here is the body from PM', body);
  res.status(201).send('You added a new entry');
});

app.put('/prices/:id', (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  db('houses')
    .where('id', id)
    .update('price', price)
    .then((updatedRows) => {
      console.log('Here is the new row', updatedRows);
      res.status(202).end();
    })
    .catch((error) => {
      console.error('unable to update price', error);
      res.status(500).end();
    });
});

app.delete('/prices/:id', (req,res) => {
  const { id } = req.params;
  db('houses')
    .where('id', id)
    .del()
    .then((response) => {
      res.status(200).send('Success you deleted the row');
    })
    .catch((error) => {
      console.error('unable to delete record', error);
      res.status(404).send('Error in delete request');
    });
});


module.exports = app; // make available for testing
