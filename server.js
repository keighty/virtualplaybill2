var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser')

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/playbills', function(req, res) {
  Post.find()
      .sort("-submitted")
      .exec(function(err, doc) {
        res.send(doc);
      });
});

app.get('/add_post', function(req, res) {
  res.send("hi from the server");
});

app.post('/new_post', function(req, res, next) {
  console.log("hello", req.statusCode, req.body);
  res.send("made it!");
});

app.listen(3030);