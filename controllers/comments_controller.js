var mongoose = require('mongoose');
var _ = require('underscore');
var Comment = require('../models/comments_model.js');

exports.postComments = function(req, res) {
  Comment.find({postId: req.params.postId})
    .exec(function(err, doc) {
      res.json(doc);
    });
};

exports.newComment = function(req, res, next) {
  var commentAttributes = req.body;
  var comment = _.extend(_.pick(commentAttributes, 'postId','userId', 'content', 'responseTo'), {
    submitted: new Date().getTime()
  });

  var newComment = new Comment(comment);
  newComment.save(function(err, doc) {
    if(err) { res.send(err); }
    else { res.json(doc); }
  });

};

exports.replyComment = function(req, res) {
  console.log("replyComment");
};
