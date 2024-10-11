import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['job seeker', 'employer', 'admin'],
      default: 'job seeker',
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);

// Use export default for ES Module syntax
export default User;