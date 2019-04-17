require('newrelic');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./../database/mysql.js');
const port = process.env.PORT;
const redis = require('redis').createClient();
let lru = require('redis-lru');
let houseCache = lru(redis, {max: 10000, maxAge: 86400000}) // cache lasts for one day

app.use(cors());
app.use('/', express.static(__dirname + '/./../client/dist'));
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// CRUD operations for "houses" endpoint
app.get('/houses/:id', (req, res) => {
  const { id } = req.params;
  console.time('cache')
  let cachedPromise = houseCache.getOrSet(id, () => {
    return db.select('street','city','state','zipcode','description','price')
      .from('houses')
      .where('id', id)
      .first()//returns one object instead of an array of objects
      .then((house) => {
        return house;
        // return res.status(200).json(house);
      })
      .catch((error) => {
        console.error('UNABLE TO GET DATA FROM DB', error);
        res.status(404).send('Invalid id in houses route');
      });
  });
  cachedPromise.then((data) => {
    console.timeEnd('cache');
    console.log('CACHE DATA FROM GETORSET METHOD', data);
    res.status(200).json(data)
  }).catch((error) => {
    console.error('unable to perform query in server', error);
    res.status(404).send('Invalid id in houses route');
  });
  // houseCache.get(id).then((data) => {
  //   if (data) {
  //     console.log('FOUND THE DATA IN REDIS CACHE', data);
  //     return res.status(200).json(data);
  //   }
  // });
  // db.select('street','city','state','zipcode','description','price')
  //   .from('houses')
  //   .where('id', id)
  //   .first()//returns one object instead of an array of objects
  //   .then((house) => {
  //     houseCache.set(id, house).then(() => res.status(200).json(house));
  //   })
  //   .catch((error) => {
  //     console.error('unable to perform query in server', error);
  //     res.status(404).send('Invalid id in houses route');
  //   });
});

app.put('/houses/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  db('houses')
    .update(body, ['id'])
    .where('id', id)
    .then((response) => {
      res.sendStatus(202);
    })
    .catch((error) => {
      console.error('Unsuccessful update', error);
      res.status(404).send(error);
    });
});

// Uses REPLACE to not break UI
app.delete('/houses/:id', (req, res) => {
  const { id } = req.params;
  const params = [id, '', '', '', 'Deleted House Listing', '00000', 0];
  const qs = `REPLACE INTO houses(id, street, city, state, description, zipcode, price) \n
  VALUES (?,?,?,?,?,?,?)`;
  db.raw(qs, params)
    .then((response) => {
      // console.log('Found response in delete request', response);
      res.status(200).send('succesfully deleted record')
    })
    .catch((error) => {
      console.error('unable to delete record', error);
      res.status(404).send('unable to delete record');
    });
});


//Update and Read operations for "prices" endpoint
app.get('/prices/:id', (req, res) => {
  const { id } = req.params;
  houseCache.get(id).then((data) => {
    if (data) {
      console.log('FOUND THE DATA IN REDIS CACHE', data);
      return res.status(200).json(data);
    }
    db.select('price').from('houses')
      .where('id', id)
      .first()
      .then((response) => {
      // console.log('SUCCESS Here is the price data: ', response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error('unable to perform query in server', error);
      res.status(404).send('Error in prices route');
    });
  });
});

app.put('/prices/:id', (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  db('houses')
    .update('price', price)
    .where('id', id)
    .then((updatedRows) => {
      // console.log('Here is the new row', updatedRows);
      res.status(202).end();
    })
    .catch((error) => {
      console.error('unable to update price', error);
      res.status(500).end();
    });
});



module.exports = app; // make available for testing
