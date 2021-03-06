const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Registration', () => {
  xit('should return all users on /users GET', function(done) {
    chai.request('http://localhost:8002')
        .get('/users')
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          done()
        })
  })

  xit('should successfully register with unique username on /users POST', function(done) {
    chai.request('http://localhost:8002')
        .post('/users')
        .type('form')
        .send({
          'username': 'testing',
          'password': '123456'
        })
        .end(function(err, res) {
          // console.log(res)
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.have.cookie('session')
          expect(res.text).to.be.equal('Successful registration')
          done()
        })
  })

  xit('should not register user with existing username on /users POST', function(done) {
    chai.request('http://localhost:8002')
      .post('/users')
      .type('form')
      .send({
        'username': 'testing',
        'password': '123456'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(409);
        expect(res).to.not.have.cookie('session')
        expect(res.text).to.be.equal('Sorry, this username has already been taken!')
        done()
      })
  })

})