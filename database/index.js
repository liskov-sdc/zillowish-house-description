// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./../database/mysql.js');
// const port = 3001;

// app.use(cors());
// app.use('/', express.static(__dirname + '/./../client/dist'));
// app.use('/:id', express.static(__dirname + '/./../client/dist'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// // CRUD operations for "houses" endpoint
// app.get('/houses/:id', (req, res) => {
//   const { id } = req.params;
//   db.select('street','city','state','zipcode','description')
//     .from('houses')
//     .where('id', id)
//     .then((house) => {
//       console.log('SUCCESS Here the House data: ', house[0]);
//       (house.length < 1) ? res.sendStatus(404) : res.status(200).json(house);
//     })
//     .catch((error) => {
//       console.error('unable to perform query in server', error);
//       res.status(404).send('Invalid id in houses route');
//     });
// });

// app.post('/houses/:id', (req, res) => {
//   const { body } = req;
//   console.log('Current id', id);
//   db('houses')
//     .insert(body, ['id'])
//     .then((response) => {
//       console.log('Found the response', response);
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.error('Error adding new House record', error);
//       res.sendStatus(404).end();
//     });
// });

// app.put('/houses/:id', (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   console.log('here is the id', id);
//   db('houses')
//     .update(body, ['id'])
//     .where('id', id)
//     .then((response) => {
//       console.log('Updated changes', response);
//       res.sendStatus(202);
//     })
//     .catch((error) => {
//       console.error('Unsuccessful update', error);
//       res.status(404).send(error);
//     });
// });

// // Uses REPLACE to not break UI
// app.delete('/houses/:id', (req, res) => {
//   const { id } = req.params;
//   const params = [id, '', '', '', 'Deleted House Listing', '00000', 0];
//   const qs = `REPLACE INTO houses(id, street, city, state, description, zipcode, price) \n
//   VALUES (?,?,?,?,?,?,?)`;
//   db.raw(qs, params)
//     .then((response) => {
//       console.log('Found response in delete request', response);
//       res.status(200).send('Succesfully deleted record');
//     })
//     .catch((error) => {
//       console.error('unable to delete record', error);
//       res.status(404).send('unable to delete record');
//     });
// });


// //Update and Read operations for "prices" endpoint
// app.get('/prices/:id', (req, res) => {
//   const { id } = req.params;
//   db.select('price').from('houses')
//     .where('id', id)
//     .then((response) => {
//     console.log('SUCCESS Here is the price data: ', response);
//     res.status(200).json(response);
//   })
//   .catch((error) => {
//     console.error('unable to perform query in server', error);
//     res.status(404).send('Error in prices route');
//   });
// });

// app.put('/prices/:id', (req, res) => {
//   const { id } = req.params;
//   const { price } = req.body;
//   db('houses')
//     .update('price', price)
//     .where('id', id)
//     .then((updatedRows) => {
//       console.log('Here is the new row', updatedRows);
//       res.status(202).end();
//     })
//     .catch((error) => {
//       console.error('unable to update price', error);
//       res.status(500).end();
//     });
// });



// module.exports = app; // make available for testing



// *************** TESTING FOR API-TEST ***************

// const expect = require('chai').expect;
// const app = require('./../server/index.js');

// chai.use(chaiHttp);

// describe('Testing API', () => {

//   it("should get house description using house's id", (done) => {
//     chai.request(app)
//       .get('/houses/1')
//       .end(function(err, res) {
//         if (err) {
//           console.error(err);
//         }
//         console.log('found Res body', res.body);
//         const {street, city, state, zipcode, description} = res.body[0];
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(description).to.be.a('string');
//         expect(street).to.be.a('string');
//         expect(city).to.be.a('string');
//         expect(zipcode).to.be.a('string');
//         expect(state).to.be.a('string');
//         expect(state).to.have.a.lengthOf(2);
//         done();
//       })
//   });

//   it("should get price for a house using house's id", (done) => {
//     chai.request(app)
//       .get('/prices/1')
//       .end(function(err, res) {
//         if (err) {
//           console.error(err);
//         }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body[0].price).to.be.a('number');
//         done();
//       })
//   });

//   it("should produce an error with incorrect house id", (done) => {
//     chai.request(app)
//       .get('/houses/200000000')
//       .end((err, res) => {
//         if (err){
//           console.error('unable to get house', err);
//         }
//         console.log('RESPONSE for incorrect house id:', res.body);
//         expect(res).to.have.status(404);
//         expect(res.body).to.be.an('object').that.is.empty;
//         done();
//       })
//   });

//   it('should add a record to the database', (done) => {
//     chai.request(app)
//     .post('/houses/5')
//     .end((err, res) => {
//       if (err) {
//         console.error(err);
//       }
//       expect(res).to.have.status(201);
//       done();
//     })
//   });

//   it('should update a house record', (done) => {
//     // need to fill in
//     done();
//   });

//   it('should delete a record from the database', (done) => {
//     // need to fill in
//     done();
//   });
// })