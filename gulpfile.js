'use strict';

var gulp = require('gulp');
var gutil = requrie('gulp-util');

var livereload = require('gulp-livereload');
var connect = require('connect');

var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = requrie('reactify');
var soure = require('vinyl-source-stream');

var dist = 'dist';

var htmlFiles = 'app/**/*.html';
var htmlBuild = dist;

var jsxFiles = 'app/jsx/**/*.jsx';

// create paths


// this currently is broken/does nothing (will fix in future)
gulp.task('vendor', function(){
  return gulp.src()
    .pipe();
});
