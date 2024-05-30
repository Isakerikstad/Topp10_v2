const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword'); // Import the hashPassword function

// Define the schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Use the imported hashPassword function in the pre-save hook
userSchema.pre('save', hashPassword);

// Ensure the User model is not redefined
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
