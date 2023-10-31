const request = require('supertest');
const { expect } = require('chai');
const app = require('./app'); // Path to your app.js

describe('Express Application', function () {
  describe('GET /', function () {
    it('should return Hello, World!', function (done) {
      request(app)
        .get('/')
        .end(function (err, res) {
          expect(res.text).to.equal('Hello, World!');
          expect(res.statusCode).to.equal(200);
          done(err);
        });
    });
  });

  describe('GET /login', function () {
    it('should require email and password', function (done) {
      request(app)
        .get('/login')
        .end(function (err, res) {
          expect(res.statusCode).to.equal(400);
          done(err);
        });
    });

    it('should respond with login successful on correct credentials', function (done) {
      // Assuming there's a user with these credentials in the database
      request(app)
        .get('/login?email=test@example.com&password=password123')
        .end(function (err, res) {
          expect(res.text).to.equal('Login successful');
          expect(res.statusCode).to.equal(200);
          done(err);
        });
    });

    // More tests can be added as needed
  });

  // Additional route tests can be added here
});
