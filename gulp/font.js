'use strict';

var gulp = require('gulp'),
 path  = require('path'),
 conf  = require('./config');

var $ = require('gulp-load-plugins')();


// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src([path.join(conf.paths.bowerComponents,
   '/font-awesome-sass/assets/fonts/**'),
  path.join(conf.paths.bowerComponents,
   '/bootstrap-sass/assets/fonts/**')])
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/fonts/')));
});
