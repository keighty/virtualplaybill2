module.exports = function(app) {
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
        submitted: new Date().getTime(),
        commentsCount: 0
      });

    var newPost = new Post(post);
    newPost.save(function(err, doc){
      if(err) { res.send(err); }
      else { res.send(doc); }
    });
  });
};
