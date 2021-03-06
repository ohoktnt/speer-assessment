const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Tweets', () => {
  it('should return all tweets on /tweets GET', function(done) {
    chai.request('http://localhost:8003')
      .get('/tweets')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json;
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return tweet with id 1 on /tweets/1 GET', function(done) {
    chai.request('http://localhost:8003')
      .get('/tweets/1')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json;
        expect(res.body).to.be.an('object')
        expect(res.body).to.deep.include({id: 1, content:"This is my first tweet!"})
        done()
      })
  })

  it('should return empty tweet for non-existing id on /tweets/100 GET', function(done) {
    chai.request('http://localhost:8003')
    .get('/tweets/100')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.be.empty
      done()
    })
  })

  it('should sucessfully post a tweet on /tweets, POST', function(done) {
    const agent = chai.request.agent('http://localhost:8003')
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
      return agent.post('/tweets')
      .send({'content': 'Hmm.. This is my second tweet.'})
      .then(function(res) {
        // using another request, check the that tweet count went 
        // from 1 to 2
        chai.request('http://localhost:8003')
        .get('/tweets')
        .end(function(err, res) {
          // console.log(res.body)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          done()
        })
      })
    })
  })

  it('should sucessfully delete a tweet on /tweets/2, DELETE', function(done) {
    const agent = chai.request.agent('http://localhost:8003')
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
      return agent.delete('/tweets/2/delete')
      .then(function(res) {
        // using another request, check the that tweet count went 
        // from 2 to 1
        chai.request('http://localhost:8003')
        .get('/tweets')
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          // console.log(res.body)
          done()
        })
      })
    })
  })

  it('should not allow user to delete other tweets that is not their own on /tweets/:tweet_id/delete DELETE', function(done) {
    const agent = chai.request.agent('http://localhost:8003')
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
      return agent.delete('/tweets/1/delete')
      .then(function(res) {
        // using another request, check the that tweet count did not change
        chai.request('http://localhost:8003')
        .get('/tweets')
        .end(function(err, res) {
          // console.log(res.body)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          done()
        })
      })
    })
  })

  it('should update tweet on /tweets/1/edit', function(done) {
    const agent = chai.request.agent('http://localhost:8003')
    // login as user to use cookie as id for messaging
    // agent used to retain cookie after request
    agent
    .post('/users/login')
    .type('form')
    .send({
      'username': 'tnt',
      'password': '123456'
    })
    .then(function (res) {
      expect(res).to.have.cookie('session')
      expect(res.body).to.have.keys(['user'])
      return agent.put('/tweets/1/edit')
      .send({'content': 'Revised my first tweet!'})
      .then(function(res) {
        // using another request, check the that tweet count did not change
        chai.request('http://localhost:8003')
        .get('/tweets/1')
        .end(function(err, res) {
          // console.log('this is revised tweet')
          // console.log(res.body)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.deep.include({content: "Revised my first tweet!"})
          done()
        })
      })
    })
  })
  


})