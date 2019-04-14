'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('./../server/index.js');

chai.use(chaiHttp);

describe('Testing API', () => {

  it("should get house description using house's id", (done) => {
    chai.request(app)
      .get('/houses/1')
      .end(function(err, res) {
        if (err) {
          console.error(err);
        }
        console.log('found Res body', res.body);
        const {street, city, state, zipcode, description} = res.body[0];
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(description).to.be.a('string');
        expect(street).to.be.a('string');
        expect(city).to.be.a('string');
        expect(zipcode).to.be.a('string');
        expect(state).to.be.a('string');
        expect(state).to.have.a.lengthOf(2);
        done();
      })
  });

  it("should get price for a house using house's id", (done) => {
    chai.request(app)
      .get('/prices/1')
      .end(function(err, res) {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0].price).to.be.a('number');
        done();
      })
  });

  it("should produce an error with incorrect house id", (done) => {
    chai.request(app)
      .get('/houses/200000000')
      .end((err, res) => {
        if (err){
          console.error('unable to get house', err);
        }
        console.log('RESPONSE for incorrect house id:', res.body);
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object').that.is.empty;
        done();
      })
  });

  it('should add a record to the database', (done) => {
    let house = {
      street: '8837 Red Leaf Road',
      city:'Bloomington',
      state: 'IN',
      description: 'Reiciendis repellat aut optio consequatur enim iure laboriosam est aliquam. Explicabo placeat minus labore illum et',
      price: 8372625
    }

    chai.request(app)
      .post('/houses/5')
      .send(house)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should update a house record', (done) => {
    let house = {
      street: '8837 Blue Rose Road',
      city:'Bloomington',
      state: 'IN',
      description: 'Reiciendis repellat aut optio consequatur enim iure laboriosam est aliquam. Explicabo placeat minus labore illum et.  In iure aut molestias corrupti minus aliquid est. Dicta maiores quo esse quis debitis dolore.',
      price: 938272
    }

    chai.request(app)
      .put('/houses/89')
      .send(house)
      .end((err, res) => {
        if (err) {
          console.error('Error in update route', err);
        }
        expect(res).to.have.status(202);
        done();
      });
  });

  it('should delete a record from the database', (done) => {
    chai.request(app)
      .delete('/houses/9120')
      .end((err, res) => {
        if (err) {
          console.error('Error in update route', err);
        }
        expect(res).to.have.status(200);
        expect(res.text).to.equal('succesfully deleted record')
        // add GET request here to check for the db request

        done();
      });
  });

  it('should update price data', (done) => {
    let newPrice = {
      price: 1484800
    };
    var formerPrice;
    // GET request for initial price data
    chai.request(app)
      .get('/prices/5000')
      .end((err, res) => {
        if (err) {
          console.error('could not GET price data', err);
        }
        formerPrice = res.body[0].price;
        expect(formerPrice).to.be.a('number');
        expect(formerPrice).to.be.lessThan(newPrice.price);
      });
    // PUT request
    chai.request(app)
      .put('/prices/5000')
      .send(newPrice)
      .end((err, res) => {
        if (err) {
          console.error('Error in update route', err);
        }
        newPrice.price++;
        expect(res).to.have.status(202);
        done();
      });
  });
});