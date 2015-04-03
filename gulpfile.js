var gulp = require('gulp');
var _ = require('lodash');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var apps_glob = "./apps/**/*.js";
var apps_dist_dir = "./lib/";

var external_libs = {
  angular: "./node_modules/angular/angular.min.js",
  angular_route: "./node_modules/angular-route/angular-route.min.js",
  jquery: "./node_modules/jquery/dist/jquery.min.js",
  bootstrap: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
  datepicker: "./lib/ui-bootstrap-datepicker-0.10.0.min.js"
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

var dest_dir = './build';

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