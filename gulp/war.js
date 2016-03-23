'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('war', ['build'], function () {
  gulp.src(['dist/**/*'])
    .pipe($.war({
      welcome: 'index.html',
      displayName: 'Gulp WAR'
    }))
    .pipe($.zip('project.war'))
    .pipe(gulp.dest('war'));
});
