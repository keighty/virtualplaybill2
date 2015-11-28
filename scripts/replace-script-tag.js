#!/usr/bin/env node
/*
Production deploy script.

Webpack will generate a hashed javascript name in order to
break local browser caching.
This script will discover the name of the new script,
and replace the source in the layout with the new
script source name.
*/

var fs = require('fs')
var path = require('path')
require('shelljs/global');

var rootPath = path.dirname(__dirname)
var distPath = rootPath + '/dist/'
var layoutPath = rootPath + '/views/layout.html'

new Promise(function (resolve, reject) {
  fs.readdir(distPath, function (err, filenames) {
    filenames.forEach(function (file) {
      if (file.match(/min.js/)) bundle = file
    })
    resolve('/dist/' + bundle)
  })
}).then(function (source) {
  var searchPattern = /\/dist\/bundle.*min\.js/
  sed('-i', searchPattern, source, layoutPath);
})
