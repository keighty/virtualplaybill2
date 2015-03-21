var mongoose = require('mongoose');

var commentsSchema = mongoose.Schema({
  postId: String,
  userId: String,
  username: String,
  submitted: { type: Date, default: Date.now },
  content: String,
  responseTo: String
});

var Comment = mongoose.model('Comment', commentsSchema, 'comments');
module.exports = Comment;
