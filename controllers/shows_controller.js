var mongoose = require('mongoose');
var _ = require('underscore');
var Show = require('../models/shows_model.js');

var aws = require('aws-sdk');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

exports.index = function(req, res) {
  res.render('index');
};

exports.count = function(req, res) {
  Show.count({}, function(err, count){
    res.json(count);
  });
};

exports.all = function(req, res) {
  Show.find()
      .sort("-showDate")
      .exec(function(err, doc) {
        res.json(doc);
      });
};

exports.showData = function(req, res) {
  Show.find({_id: req.params.id})
      .exec(function(err, doc){
        res.json(doc);
      });
};

exports.newShow = function(req, res, next) {
  var showAttributes = req.body;
  var show = _.extend(_.pick(showAttributes, 'url', 'title', 'company', 'author', 'synopsis', 'director', 'music', 'choreographer','showDate', 'imageUrl', 'cast', 'rating', 'ratings'), {
      submitted: new Date().getTime(),
      commentsCount: 0
    });

  var newShow = new Show(show);
  newShow.save(function(err, doc){
    if(err) { res.send(err); }
    else { res.json(doc); }
  });
};

exports.editShow = function(req, res) {
  var showAttributes = req.body,
      conditions = { _id: showAttributes._id };

  delete showAttributes._id;
  showAttributes.submitted = new Date().getTime();

  Show.update(conditions, showAttributes, function(err, numAffected) {
    if(err) { res.send(err); }
    else { res.json(numAffected); }
  });
};

exports.deleteShow = function(req, res) {
  var show = req.body;
  Show.find({ _id: show._id }).remove( function(err, numAffected) {
    if(err) { res.send(err); }
    else { res.json(numAffected); }
  });
};

exports.signS3 = function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3();
  var s3_params = {
      Bucket: S3_BUCKET,
      Key: req.query.s3_object_name,
      Expires: 60,
      ContentType: req.query.s3_object_type,
      ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          var return_data = {
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
          };
          res.write(JSON.stringify(return_data));
          res.end();
      }
  });
};
