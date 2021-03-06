const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing Messages', () => {

  it('should show all messages for the user on /users/:user_id/messages GET', function(done) {
    chai.request('http://localhost:8000')
    .get('/users/1/messages')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array');
      // expect(res.body.length).to.be(4)
      // add to check the length
      // console.log(res.body)
      done()
    })
  })


  // it('should show the messages between user 2 and user 3')

})