var mongoose = require('mongoose');
var _ = require('underscore');
var Comment = require('../models/comments_model.js');

exports.postComments = function(req, res) {
  console.log("postComments");
};

exports.newComment = function(req, res) {
  console.log("newComment");
};

exports.replyComment = function(req, res) {
  console.log("replyComment");
};