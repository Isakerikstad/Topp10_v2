const User = require('../models/user'); // Ensure the path is correct
const jwt = require('jsonwebtoken');

// Handle user registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Request body:', req.body); // Logging for debugging

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();
    console.log('User saved with hashed password:', user.password); // Logging for debugging

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log('User registered successfully', token);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
};

// Handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Get login data from the request body

  console.log('Login attempt:', { email, password }); // Log login attempt


  try {
    let user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' }); // If user not found, return an error
    }

    console.log('User found:', user); // Log found user

    const isMatch = await bcrypt.compare(password, user.password); // Compare the password with the stored hash
    console.log('Password comparison result:', isMatch); // Log password comparison result
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' }); // If password doesn't match, return an error
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    // Create a JWT token for the logged-in user
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret key from the .env file
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token to the client
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error'); // Handle server errors
  }
};

// Export the controller functions so they can be used in routes
module.exports = {
  registerUser,
  loginUser
};
