// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Middleware to log IP addresses
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP address: ${ip}`);
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Simple authentication logic (for demonstration purposes)
  if (username === 'admin' && password === 'password') {
    res.send(`<h1>Welcome, ${username}</h1>`);
  } else {
    res.send('<h1>Invalid credentials</h1>');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
