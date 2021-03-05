const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing new chai http library', () => {
  it('should return all users on /users GET', function(done) {
    chai.request('http://localhost:8000')
        .get('/users')
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json;
          // res.body.should.be.a('array');
          // console.log(res.body)
          done()
        })
  })
})