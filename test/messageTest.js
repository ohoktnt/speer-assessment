const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Messages', function() {

  it('should show all messages for the user on /users/1/messages GET', function(done) {
    chai.request('http://localhost:8002')
    .get('/users/1/messages')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(4);
      done()
    })
  })


  it('should show the messages only between user 2 and user 3', function(done) {
    chai.request('http://localhost:8002')
    .get('/users/2/messages/3')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
      done()
    })
  })

  it('should allow user to send a message to another user', function(done)  {
    const agent = chai.request.agent('http://localhost:8002')
    // login as user to use cookie as id for messaging
    // agent used to retain cookie after request
    agent
    .post('/users/login')
    .type('form')
    .send({
      'username': 'jess',
      'password': '123456'
    })
    .then(function (res) {
      expect(res).to.have.cookie('session')
      expect(res.body).to.have.keys(['user'])
      return agent.post('/users/3/messages')
      .send({
        'receiver_id': '2',
        'message': 'Hello back to you Lisa.'
      })
      .then(function(res) {
        // using another request, check the that message count went 
        // from 1 to 2
        chai.request('http://localhost:8002')
        .get('/users/3/messages')
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          // console.log(res.body)
          done()
        })
      })
    })
    
  })

})