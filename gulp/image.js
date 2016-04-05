'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
  return gulp.src(conf.paths.images)
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(conf.paths.dist, 'assets', 'images')))
    .pipe($.size());
});
