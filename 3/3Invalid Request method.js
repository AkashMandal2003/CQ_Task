const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let invalidRequestCount = 0;

// app.post('/signup', (req, res) => {
//   const { name, gender, age } = req.body;

//   if (!name || !gender || !age) {
//     return res.status(400).json({ error: 'Missing required user details' });
//   }

//   // Create a user object
//   const user = {
//     name,
//     gender,
//     age
//   };

//   // Convert user object to JSON
//   const userJSON = JSON.stringify(user);

//   // Append user JSON to users.txt file
//   fs.appendFile('users.txt', userJSON + '\n', (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error while saving user data' });
//     }
//     res.status(200).json({ message: 'User data saved successfully' });
//   });
// });

// GET endpoint for invalid requests to /signup
app.get('/signup', (req, res) => {
  // Increase the invalid request count
  invalidRequestCount++;

  res.status(400).send(`Invalid request method - ${invalidRequestCount}`);
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
