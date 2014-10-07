var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/virtual_playbill');

var postSchema = {
  "url" : String,
  "title" : String,
  "company" : String,
  "author" : String,
  "music" : String,
  "showDate" : String,
  "userId" : String,
  "postAuthor" : String,
  "submitted" : Number,
  "commentsCount" : Number,
  "_id" : String,
};

var Post = mongoose.model('Post', postSchema, 'posts');

var app = express();
app.get('/playbills', function(req, res) {
  // res.send("hello");
  Post.find(function(err, doc) {
    res.send(doc);
  });
});

app.listen(3030);