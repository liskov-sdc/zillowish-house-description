'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('./../server/index.js');

chai.use(chaiHttp);

describe('Testing API', () => {

  it("should get house description using house's id", () => {
    chai.request(app)
      .get('/houses/1')
      .end(function(err, res) {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0].id).to.equal(1);
        done();
      })
  })

  it("should get price for a house using house's id", () => {
    chai.request(app)
      .get('/prices/1')
      .end(function(err, res) {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0].id).to.equal(1);
        done();
      })
  })

  it("should produce an error with incorrect house id", () => {
    chai.request(app)
      .get('/houses/20000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
  })
})