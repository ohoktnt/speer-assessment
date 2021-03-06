const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Login', () => {

  it('should successfully login with correct credentials on /users/login POST', function(done) {
    chai.request('http://localhost:8000')
    .post('/users/login')
    .type('form')
    .send({
      'username': 'tnt',
      'password': '123456'
    })
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.cookie('session')
      expect(res).to.be.json;
      // console.log(res.body)
      expect(res.body).to.have.keys(['user'])
      done()
    })
  });

  it('should not login with wrong credentials on /users/login POST', function(done) {
    chai.request('http://localhost:8000')
    .post('/users/login')
    .type('form')
    .send({
      'username': 'tnt',
      'password': '654321'
    })
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.not.have.cookie('session')
      expect(res).to.be.json;
      expect(res.body).to.be.deep.include({error: 'User does not exist or password does not match'})
      done()
    })
  })

})