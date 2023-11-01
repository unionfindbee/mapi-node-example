const request = require('supertest');
const { expect } = require('chai');
const { app, server, db } = require('./app'); // Adjust the path and destructure accordingly


describe('GET /', function() {
  it('responds with Hello, World!', function(done) {
    after(function() {
        // Close the server and SQLite database connection after all tests
        server.close();
        db.close();
      });

    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.equal('Hello, World!');
        done();
      });
  });
});
