import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Add this import

import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoute.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI is undefined. Check your .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database name:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });
// Use the user routes\
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  console.log('Request body:', req.body);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes); 
app.post('/test', (req, res) => {
  console.log('Test route hit');
  console.log('Request body:', req.body);
  res.json({ message: 'Test successful', receivedData: req.body });
});
// Test route
app.get('/test', (req, res) => {
  res.send('Test route working');
});


const PORT = process.env.PORT || 5001; // Use the PORT from .env or default to 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);