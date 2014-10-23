var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function encryptPw(pw) {
  return crypto.createHash('sha256').update(pw).digest('base64').toString();
}

exports.signup = function(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email
  });
  user.set('hashed_password', encryptPw(req.body.password));
  user.save(function(err) {
    if(err) {
      req.session.error = err;
      res.redirect('/signup');
    } else {
      createSession(req, user);
      res.redirect('/');
    }
  });
};

function createSession(req, user) {
  req.session.user = user.id;
  req.session.username = user.username;
  req.session.msg = "Welcome " + user.username;
  // this may not modify the request in place as it is intended
}

exports.login = function(req, res) {
  User.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    if(!user) {
      err = "User not found.";
    } else {
      var pw = encryptPw(req.body.password);
      if(user.hashed_password === pw) {
        req.session.regenerate(function() {
          createSession(req, user);
          res.redirect('/');
        });
      } else {
        err = "Authentication failed.";
      }
      if(err) {
        req.session.regenerate(function() {
          req.session.msg = err;
          res.redirect('/login');
        });
      }
    }
  });
};
