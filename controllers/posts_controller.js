var mongoose = require('mongoose');
var _ = require('underscore');
var Post = require('../models/posts_model.js');

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
}
