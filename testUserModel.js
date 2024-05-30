const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Simplified pre-save hook for testing
userSchema.pre('save', function(next) {
  console.log('Pre-save hook called');
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      console.log('Password hashed:', user.password);
      next();
    });
  });
});

const User = mongoose.model('TestUser', userSchema);

async function testUserCreation() {
  await mongoose.connect('mongodb+srv://isakerikstad:JakopogIsaktopp10@cluster0.ou8muyj.mongodb.net/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const newUser = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'plaintextpassword'
  });

  await newUser.save();
  console.log('User saved with hashed password:', newUser.password);
  await mongoose.disconnect();
}

testUserCreation().catch(err => console.error('Error:', err));
