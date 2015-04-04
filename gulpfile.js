var gulp = require('gulp');
var _ = require('lodash');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var external_libs = {
  jquery: "./node_modules/jquery/dist/jquery.min.js",
  bootstrap: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
  angular: "./node_modules/angular/angular.min.js",
  angular_route: "./node_modules/angular-route/angular-route.min.js"
};

var size_opts = {
  showFiles: true,
  gzip: true
};

var apps_glob = "./apps/*.js";
var dest_dir = './lib';

gulp.task("common", function() {
  var paths = [];

  // Get the path to each externalizable lib.
  _.forEach(external_libs, function(path) {
    paths.push(path);
  });

  return gulp.src(paths)
    .pipe(size(size_opts))
    .pipe(concat("common.min.js"))
    .pipe(uglify())
    .pipe(size(size_opts))
    .pipe(gulp.dest(dest_dir));
});

gulp.task("s3", function() {
  return gulp.src('./lib/s3upload.js')
    .pipe(size(size_opts))
    .pipe(uglify())
    .pipe(rename('s3upload.min.js'))
    .pipe(gulp.dest(dest_dir));
});

gulp.task("app", function() {
  return gulp.src(apps_glob)
    .pipe(size(size_opts))
    .pipe(concat("app.min.js"))
    .pipe(size(size_opts))
    .pipe(gulp.dest(dest_dir));
});

gulp.task('default', ['s3', 'app', 'common']);