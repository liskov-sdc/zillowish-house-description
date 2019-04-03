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
    chai.request(app)
    .post('/houses/5')
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      expect(res).to.have.status(201);
      done();
    })
  });

  it('should update a house record', (done) => {
    // need to fill in 
    done();
  });

  it('should delete a record from the database', (done) => {
    // need to fill in
    done();
  });
})