import User from '../models/user.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  console.log('Received request body:', req.body);
  console.log('Content-Type:', req.get('Content-Type'));

  const { email, password, role } = req.body;

  console.log('Destructured values:');
  console.log('email:', email);
  console.log('password:', password);
  console.log('role:', role);

  if (!email || !password || !role) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log('User registered successfully:', newUser);

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, registerUser as createUser };