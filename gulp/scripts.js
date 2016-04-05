'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('scripts', function() {
  return gulp.src(path.join(conf.paths.src, '/{app,components}/**/*.js'))
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jscs({configPath: '.jscsrc'}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
