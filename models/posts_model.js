var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title : String,
  company : String,
  author : String,
  music : String,
  director: String,
  choreographer : String,
  showDate : { type: Date, default: Date.now },
  imageUrl: String,
  userId : String,
  postAuthor : String,
  submitted : Number,
  commentsCount : Number,
  cast : { type : Object , "default" : {} }
});

var Post = mongoose.model('Post', postSchema, 'posts');
module.exports = Post;
