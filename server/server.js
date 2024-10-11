import express from 'express';
import mongoose from 'mongoose';
import { registerUser } from './controllers/userController.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  console.error('MONGODB_URL is undefined. Check your .env file.');
  process.exit(1); // Exit if the URL is not set
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.post('/api/users/register', registerUser);

// Other routes...

const PORT = process.env.PORT || 5001;  // Default port can still be overridden
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
