'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles())
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});
