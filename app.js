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

// Login endpoint (Unsafe)
app.get('/login', (req, res) => {
    const { email, password } = req.query;
  
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
    const query = `SELECT * FROM users WHERE email = '${email}' and password = '${password}'`;
  
    db.get(query, [], (err, row) => {
      if (err) {
        return res.status(500).send(`{"error": "${err.message}"}`);
      }
      return res.send('Login successful');
    });
  }); 
  

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app; // Export app for testing




