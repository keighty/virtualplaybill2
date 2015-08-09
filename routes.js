var crypto = require('crypto');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');

module.exports = function(app) {
  var Show = require('./controllers/shows_controller.js');
  var User = require('./controllers/users_controller.js');

  app.use(partials());
  app.use(bodyParser.json());

  /************
    User Routes
  *************/
  app.get('/user', User.getUser);
  app.get('/signup', User.renderSignup);
  app.get('/signin', User.renderSignin);
  app.get('/logout', User.logout);
  app.get('/user/profile', User.profile);

  app.post('/signup', User.signup);
  app.post('/signin', User.signin);

  /****************
    Playbill Routes
  *****************/
  app.get('/', Show.index);
  app.get('/shows', Show.posts);
  app.get('/playbill_count', Show.count);
  app.get('/post/playbill/:id', Show.post);
  app.get('/post/:postId', Show.renderPost);
  app.get('/add_post', Show.postForm);

  app.post('/new_post',  Show.newPost);
  app.post('/edit_post',  Show.editPost);
  app.post('/delete_post',  Show.deletePost);

  app.get('/sign_s3', Show.signS3);

  app.use('/*', function(req, res){
    res.sendFile(__dirname + '/views/layout.html');
  });

};
