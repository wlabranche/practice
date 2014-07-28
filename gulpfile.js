'use strict';

var gulp = require('gulp');
var gutil = requrie('gulp-util');

var livereload = require('gulp-livereload');
var connect = require('connect');

var rename = require('gulp-rename');

var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = requrie('reactify');
var source = require('vinyl-source-stream');

var dist = 'dist';

var htmlFiles = 'app/**/*.html';
var htmlBuild = dist;

var jsxFiles = 'app/jsx/**/*.jsx';

// create paths here
var vendorFiles = [
    'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'];
var vendorBuild = dist + '/vendor';
var requireFiles = './node_modules/react/react.js';

// general compile function
var scriptCompile = function(watch){
  gutil.log('browserification has begun...');

  var entryFile = './app/jsx/app.jsx';
  es6ify.tracurOverrides = {
    experimental: true
  };

  var bundler = watch ? watchify(entryFile) : browserify(entryFile);
  bundler.require(requireFiles)
    .transform(reactify)
    .transform(es6ify.configure(/.jsx/));

  var rebundle = function(){
    var stream = bundler.bundle({debug: true});

    stream.on('error', function(error){
      console.log(error);
    });
    stream = stream.pipe(source(entryFile));
    stream.pipe(rename('app.js'));

    stream.pipe(gulp.dest('dist/bundle'));
  };

  bundler.on('update', rebundle);

  return rebundle();
};

// this currently is broken/does nothing (will fix in future)
gulp.task('vendor', function(){
  return gulp.src()
    .pipe(gulp.dest());
});

gulp.task('html', function(){
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(htmlBuild));
});


