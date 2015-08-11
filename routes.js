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
  app.all('*', User.authenticated);

  app.get('/', Show.index);
  app.get('/shows', Show.all);
  app.get('/show_count', Show.count);
  app.get('/showData/:id', Show.showData);

  app.post('/new_show',  Show.newShow);
  app.post('/edit_show',  Show.editShow);
  app.post('/delete_show',  Show.deleteShow);

  app.get('/sign_s3', Show.signS3);

  app.use('/*', function(req, res){
    res.sendFile(__dirname + '/views/layout.html');
  });

};
