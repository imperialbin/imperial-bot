const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: Number,
  apiToken: String
})

module.exports = mongoose.model('Users', UserSchema);