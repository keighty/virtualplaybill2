var mongoose = require('mongoose');
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
