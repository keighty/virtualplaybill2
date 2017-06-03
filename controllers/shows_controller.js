const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const _ = require('underscore')
const Show = require('../models/shows_model.js')
const { keys } = require('../models/show_attributes.js')

const aws = require('aws-sdk')
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const S3_BUCKET = process.env.S3_BUCKET

exports.index = function(req, res) {
  res.render('index')
}

exports.count = function(req, res) {
  Show.count({}, function(err, count){
    res.json(count)
  })
}

exports.all = function(req, res) {
  Show.find()
      .sort("-showDate")
      .exec(function(err, doc) {
        res.json(doc)
      })
}

exports.showData = function(req, res) {
  Show.find({_id: req.params.id})
      .exec(function(err, doc){
        res.json(doc)
      })
}

exports.newShow = function(req, res, next) {
  const newShowAttributes = req.body
  const show = _.extend(_.pick(
        newShowAttributes,
        keys
      ),
    {
      submitted: new Date().getTime(),
      commentsCount: 0
    })

  const newShow = new Show(show)
  newShow.save(function(err, doc){
    if(err) { res.send(err) }
    else { res.json(doc) }
  })
}

exports.editShow = function(req, res) {
  const showAttributes = req.body,
      conditions = { _id: showAttributes._id }

  delete showAttributes._id
  showAttributes.submitted = new Date().getTime()

  Show.update(conditions, showAttributes, function(err, numAffected) {
    if(err) { res.send(err) }
    else { res.json(numAffected) }
  })
}

exports.deleteShow = function(req, res) {
  const show = req.body
  Show.find({ _id: show._id }).remove( function(err, numAffected) {
    if(err) { res.send(err) }
    else { res.json(numAffected) }
  })
}

exports.signS3 = function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY})
  const s3 = new aws.S3()
  const s3_params = {
      Bucket: S3_BUCKET,
      Key: req.query.s3_object_name,
      Expires: 60,
      ContentType: req.query.s3_object_type,
      ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
          console.log(err)
      }
      else{
          const return_data = {
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
          }
          res.write(JSON.stringify(return_data))
          res.end()
      }
  })
}
