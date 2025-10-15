require('dotenv').config();
const express = require('express');
const app = express();
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes'); 

// Connect to MongoDB
connectToDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Port setup
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
