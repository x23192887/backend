const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory array to store data
let users = [];

// Routes
// Create a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

// Read all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Read a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[index] = { ...users[index], ...updateUser };
  res.json(users[index]);
});


// Delete a user by name
app.delete('/api/users/:name', (req, res) => {
    const userName = req.params.name;
    const index = users.findIndex(u => u.name === userName);
    if (index === -1) {
      return res.status(404).json({ message: `User '${userName}' not found` });
    }
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser);
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
