const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Verbose for easier debugging
const app = express();
const port = 3000;

// Create an in-memory database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});
  
// Create a table
db.run('CREATE TABLE users (email TEXT, password TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Table created.');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
  
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = {
  app: app,       // Export app for testing
  server: server, // Export server instance for testing
  db: db          // Export SQLite db instance for testing
};




