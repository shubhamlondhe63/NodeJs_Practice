const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDBKey = process.env.MONGODB_KEY;

// Middleware
app.use(cors()); // Use cors middleware to enable CORS

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with database name
mongoose.connect(mongoDBKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'LaptopDatabase' // Specify the database name here
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the application if MongoDB connection fails
});

// Define Laptop Schema
const laptopSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
  }, { collection: 'LaptopCollection' }); 

  const Laptop = mongoose.model('Laptop', laptopSchema, 'LaptopCollection'); // Specify the model name and collection name here

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

app.get('/api/laptops/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await Laptop.findById(id);

    if (!laptop) {
      return res.status(404).json({ error: 'Laptop not found' });
    }
    res.json(laptop);
  } catch (error) {
    console.error('Error fetching laptop details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/laptops', async (req, res) => {
    try {
      const { name, brand, price } = req.body;
      const newLaptop = new Laptop({ name, brand, price });
      await newLaptop.save();
      res.status(201).json({ message: 'Laptop added successfully', laptop: newLaptop });
    } catch (error) {
      console.error('Error adding laptop:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.put('/api/laptops/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price } = req.body;
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, { name, brand, price }, { new: true });
    res.json({ message: 'Laptop updated successfully', laptop: updatedLaptop });
  } catch (error) {
    console.error('Error updating laptop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/laptops/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Laptop.findByIdAndDelete(id);
    res.json({ message: 'Laptop deleted successfully' });
  } catch (error) {
    console.error('Error deleting laptop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
