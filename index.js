const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDBKey = process.env.MONGODB_KEY;

// Connect to MongoDB
mongoose.connect(mongoDBKey)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

// Middleware for parsing JSON bodies
app.use(express.json());

// Define Laptop Schema
const laptopSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
});

const Laptop = mongoose.model('Laptop', laptopSchema);

// Define API routes
app.get('/api/laptops', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
