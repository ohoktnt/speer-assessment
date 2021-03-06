const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Login', () => {

  it('should successfully login with correct credentials on /users/login POST', function(done) {
    chai.request('http://localhost:8003')
      .post('/users/login')
      .type('form')
      .send({
        'username': 'tnt',
        'password': '123456'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('session');
        expect(res).to.be.json;
        expect(res.body).to.have.keys(['user']);
        done();
      });
  });

  it('should not login with wrong credentials on /users/login POST', function(done) {
    chai.request('http://localhost:8003')
      .post('/users/login')
      .type('form')
      .send({
        'username': 'tnt',
        'password': '654321'
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.not.have.cookie('session');
        expect(res).to.be.json;
        expect(res.body).to.be.deep.include({error: 'User does not exist or password does not match'});
        done();
      });
  });

  it('should clear the cookie session when the user logouts on /users/logout POST', function(done) {
    const agent = chai.request.agent('http://localhost:8003');
    // login as user to validate cookie
    // agent used to retain cookie after request
    agent
      .post('/users/login')
      .type('form')
      .send({
        'username': 'jess',
        'password': '123456'
      })
      .then(function(res) {
        expect(res).to.have.cookie('session');
        expect(res.body).to.have.keys(['user']);
        return agent.post('/users/logout')
                    .then(() => {
                      // using another request, check the that session has been cleared after logout
                      chai.request('http://localhost:8003')
                      .get('/users')
                      .end(function(err, res) {
                        expect(res).to.not.have.cookie('session');
                        done();
                      });
                    });
      });
  });

});