#!/usr/bin/env node
// To add CacheControl headers to all the images in S3
// Much MUCH better than doing it manually:

// 1. get a list of all object keys
// 2. loop over the list:
//  i. set the params
//  ii. copy the object
// 3. verify

var aws = require('aws-sdk')
var s3 = new aws.S3();

var params = {
  'Bucket': process.env.S3_BUCKET,
}

new Promise(function (res, rej) {
  s3.listObjects(params, function(err, data) {
    if(err) console.log('Something went wrong when retrieving the list of objects: ' + err)
    var images = data.Contents.map(function (image) {
      return image.Key
    })
    res(images)
  })
}).then(function (imageList) {
  return collectImageParams(imageList)
}).then(function (imageChangeParams) {
  imageChangeParams.forEach(function (params) {
    s3.copyObject(params, function (err, data) {
      console.log(err, data)
    })
  })
})

function collectImageParams(imageList) {
  var imageParamsForUpload = []
  imageList.map(function (imageName) {
    var imageParams = {
      'Bucket': params.Bucket,
      'ACL': 'public-read',
      'MetadataDirective': 'REPLACE',
      'CacheControl': 'max-age=2592000',
      'ContentType': 'image/jpeg'
    }
    imageParams.Key = imageName
    imageParams.CopySource = '/' + imageParams.Bucket +'/' + imageParams.Key
    imageParamsForUpload.push(imageParams)
  })
  return imageParamsForUpload
}
