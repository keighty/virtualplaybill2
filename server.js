var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

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
app.use(cors());
app.get('/playbills', function(req, res) {
  // res.send("hello");
  Post.find(function(err, doc) {
    res.send(doc);
  });
});

app.listen(3030);