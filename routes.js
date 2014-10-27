var crypto = require('crypto');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function(app) {
  var Post = require('./models/posts_model.js');
  var users = require('./controllers/users_controller.js');

  app.use('/static', express.static('./static'));
  app.use('/lib', express.static('./lib'));
  app.use(partials());
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    if(req.session.user) {
      res.render('index', {username: req.session.user});
    } else {
      req.session.msg = 'Access denied';
      res.redirect('/signin');
    }
  });

  app.get('/user', function(req, res) {
    if(req.session.user) {
      res.render('user', {msg: req.session.msg});
    } else {
      req.session.msg = "Access denied";
      res.redirect('/signin');
    }
  });

  app.get('/signup', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    } else {
      res.render('signup', {msg: req.session.msg});
    }
  });

  app.get('/signin', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    } else {
      res.render('signin', {msg: req.session.msg});
    }
  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/signin');
    });
  });

  app.post('/signup', users.signup);
  // app.post('/user/update', users.updateUser);
  // app.post('/user/delete', users.deleteUser);
  app.post('/signin', users.signin);
  app.get('/user/profile', users.profile);

  app.get('/playbills', function(req, res) {
    Post.find()
        .sort("-submitted")
        .exec(function(err, doc) {
          res.send(doc);
        });
  });

  app.get('/add_post', function(req, res) {
    res.render('add_post', {username: req.session.user});
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
