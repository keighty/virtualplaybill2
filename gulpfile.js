var gulp = require('gulp');
var _ = require('lodash');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var apps_glob = "./apps/*.js";

var external_libs = {
  jquery: "./node_modules/jquery/dist/jquery.min.js",
  bootstrap: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
  angular: "./node_modules/angular/angular.min.js",
  angular_route: "./node_modules/angular-route/angular-route.min.js"
};

var browserify_transforms = ["brfs"];

var auto_build_flag_file = ".autobuild";

var size_opts = {
  showFiles: true,
  gzip: true
};

var lint_opts = {
  unused: true,
  eqnull: true,
  jquery: true
};

var dest_dir = './lib';

gulp.task("build-common-lib", function() {
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

gulp.task("default", function() {
  return gulp.src(apps_glob)
    .pipe(size(size_opts))
    .pipe(concat("app.min.js"))
    .pipe(size(size_opts))
    .pipe(gulp.dest(dest_dir));
});
