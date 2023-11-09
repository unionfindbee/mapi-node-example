const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Verbose for easier debugging
const fs = require('fs');
const path = require('path');
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
      return res.status(500).send(`{"error": "${err.stack}"}`);
    }
    return res.send('Login successful');
  });
}); 
  

// Vulnerable attachment endpoint
app.get('/attachment/:name', (req, res) => {
  // This line directly takes the user input and appends it to the directory path
  const attachmentName = req.params.name;
  const attachmentPath = path.join(__dirname, 'attachments', attachmentName);

  // Check if file exists
  if (!fs.existsSync(attachmentPath)) {
    return res.status(404).send('Attachment not found');
  }

  // Read the file and send it in the response
  fs.readFile(attachmentPath, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.setHeader('Content-Type', 'text/plain');
    res.send(data);
  });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = {
  app: app,       // Export app for testing
  server: server, // Export server instance for testing
  db: db          // Export SQLite db instance for testing
};




