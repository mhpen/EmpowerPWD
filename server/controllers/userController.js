import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// Helper function for input validation
const validateUserInput = ({ email, password }) => {
  const errors = {};
  if (!email || !email.includes('@')) {
    errors.email = 'Invalid email format';
  }
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  return errors;
};

// Create Account 
export const registerUser = async (req, res) => {
  try {
    console.log('registerUser function called');
    console.log('Request Body:', req.body);

    const { email, password, role } = req.body;

    // Validate input
    const errors = validateUserInput(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log('User saved:', newUser);
    res.status(201).json({ message: 'User registered successfully!', user: { email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error('Error in registerUser:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Login User
export const logUser = async (req, res) => {

  const {email, password} = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const userInfo = await User.findOne({email: email});

  if(!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, userInfo.password);
  
  if (userInfo.email == email && isMatch){
    return res.status(200).json({ message: 'Login successful', user: { email: userInfo.email, role: userInfo.role } });
  }

  if(!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

};
