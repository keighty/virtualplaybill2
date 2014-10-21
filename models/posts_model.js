var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  "url" : String,
  "title" : String,
  "company" : String,
  "author" : String,
  "music" : String,
  "choreographer" : String,
  "showDate" : String,
  "image": String,
  "userId" : String,
  "postAuthor" : String,
  "submitted" : Number,
  "commentsCount" : Number
});

var Post = mongoose.model('Post', postSchema, 'posts');
module.exports = Post;
