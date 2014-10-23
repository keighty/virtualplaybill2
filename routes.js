var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function(app) {
  var Post = require('./models/posts_model.js');
  var users = require('./controllers/users_controller.js');

  app.use('/static', express.static('./static'));
  app.use('/lib', express.static('./lib'));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    if(req.session.user) {
      res.render('index', {username: req.session.user});
    } else {
      req.session.msg = 'Access denied';
      res.redirect('/login');
    }
  });

  app.get('/user', function(req, res) {
    if(req.session.user) {
      res.render('user', {msg: req.session.msg});
    } else {
      req.session.msg = "Access denied";
      res.redirect('/login');
    }
  });

  app.get('/signup', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    } else {
      res.render('signup', {msg: req.session.msg});
    }
  });

  app.get('/login', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    } else {
      res.render('login', {msg: req.session.msg});
    }
  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/login');
    });
  });

  app.post('/signup', users.signup);
  // app.post('/user/update', users.updateUser);
  // app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  // app.get('/user/profile', users.getUserProfile);

  app.get('/playbills', function(req, res) {
    Post.find()
        .sort("-submitted")
        .exec(function(err, doc) {
          res.send(doc);
        });
  });

  app.get('/add_post', function(req, res) {
    res.send("hi from the server");
  });

  app.post('/new_post', function(req, res, next) {
    var postAttributes = req.body;
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'company', 'author', 'music', 'showDate', 'image'), {
        submitted: new Date().getTime(),
        commentsCount: 0
      });

    var newPost = new Post(post);
    newPost.save(function(err, doc){
      if(err) { res.send(err); }
      else { res.send(doc); }
    });
  });
};
