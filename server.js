var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
var Post = require('./models/posts_model.js');

mongoose.connect('mongodb://localhost/virtual_playbill');

var app = express();
app.use(cors());
app.use(bodyParser.json());

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
  var postAttributes = req.body;
  var post = _.extend(_.pick(postAttributes, 'url', 'title', 'company', 'author', 'music', 'showDate', 'image'), {
      // userId: user._id,
      // postAuthor: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0
    });


  var newPost = new Post(post);
  newPost.save(function(err, doc){
    if(err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

app.listen(3030);
