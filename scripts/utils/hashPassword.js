const bcrypt = require('bcryptjs');

const hashPassword = async function (next) {
  console.log('Pre-save hook called');
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password hashed:', user.password);
    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    next(err);
  }
};

module.exports = hashPassword;
