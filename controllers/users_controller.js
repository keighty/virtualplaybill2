var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('User');

function encryptPw(pw) {
  return crypto.createHash('sha256').update(pw).digest('base64').toString();
}

exports.authenticated = function(req, res, next) {
  if(req.session.user) {
    return next();
  } else {
    req.session.msg = 'Access denied';
    return res.redirect('signin');
  }
};

exports.getUser = function(req, res) {
  if(req.session.user) {
    res.render('user', {msg: req.session.msg});
  } else {
    req.session.msg = "Access denied";
    res.redirect('signin');
  }
};

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

exports.renderSignup = function(req, res) {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('signup', {msg: req.session.msg});
  }
};


function createSession(req, user) {
  req.session.user = user.id;
  req.session.username = user.username;
  req.session.msg = "Welcome " + user.username;
}

exports.signin = function(req, res) {
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
          res.redirect('/signin');
        });
      }
    }
  });
};

exports.renderSignin = function(req, res) {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('signin', {msg: req.session.msg});
  }
};

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/signin');
  });
};

exports.profile = function(req, res) {
  var profileUser = User.findOne({_id: req.session.user});
  profileUser.exec(function(err, user) {
    if(!user) {
      res.status(404).json({err: "User not found."});
    } else {
      res.status(200).json(user);
    }
  });
};
