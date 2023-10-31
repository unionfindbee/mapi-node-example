const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./app'); // Make sure to export your app in app.js

chai.use(chaiHttp);

describe('Express App', function() {
  let server;

  // Start server before tests
  before(done => {
    server = app.listen(3001, done);
  });

  // Stop server after tests
  after(done => {
    server.close(done);
  });

  it('should return Hello, World! on GET /', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello, World!');
        done();
      });
  });

  // Add more tests here
});
