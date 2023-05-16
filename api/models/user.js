const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Compare the provided password with the stored password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
