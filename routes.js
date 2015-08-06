var crypto = require('crypto');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');

module.exports = function(app) {
  var Post = require('./controllers/posts_controller.js');
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
  app.get('/', Post.index);
  app.get('/playbills', Post.posts);
  app.get('/playbill_count', Post.count);
  app.get('/post/playbill/:id', Post.post);
  app.get('/post/:postId', Post.renderPost);
  app.get('/add_post', Post.postForm);

  app.post('/new_post',  Post.newPost);
  app.post('/edit_post',  Post.editPost);
  app.post('/delete_post',  Post.deletePost);

  app.get('/sign_s3', Post.signS3);

  app.use('/*', function(req, res){
    res.sendFile(__dirname + '/views/layout.html');
  });

};
