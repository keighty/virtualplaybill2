var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  email: String,
  hashed_password: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
