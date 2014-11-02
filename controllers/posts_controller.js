var mongoose = require('mongoose');
var _ = require('underscore');
var Post = require('../models/posts_model.js');

exports.index = function(req, res) {
  if(req.session.user) {
    res.render('index', {username: req.session.user});
  } else {
    req.session.msg = 'Access denied';
    res.redirect('signin');
  }
};

exports.posts = function(req, res) {
  Post.find()
      .sort("-submitted")
      .exec(function(err, doc) {
        res.json(doc);
      });
};

exports.post = function(req, res) {
  Post.find({_id: req.params.id})
      .exec(function(err, doc){
        res.json(doc);
      });
};

exports.renderPost = function(req, res) {
  if(req.session.user) {
    res.render('post');
  } else {
    req.session.msg = 'Access denied';
    res.redirect('signin');
  }
};

exports.newPost = function(req, res, next) {
  var postAttributes = req.body;
  var post = _.extend(_.pick(postAttributes, 'url', 'title', 'company', 'author', 'music', 'showDate', 'image'), {
      submitted: new Date().getTime(),
      commentsCount: 0
    });

  var newPost = new Post(post);
  newPost.save(function(err, doc){
    if(err) { res.send(err); }
    else { res.json(doc); }
  });
};

exports.editPost = function(req, res) {
  var postAttributes = req.body,
      conditions = { _id: postAttributes._id },
      update = postAttributes;

  delete postAttributes._id;
  postAttributes.submitted = new Date().getTime();

  Post.update(conditions, update, function(err, numAffected) {
    if(err) { res.send(err); }
    else { res.json(numAffected); }
  });
};

exports.postForm = function(req, res) {
  res.render('post_form', {username: req.session.user});
};
