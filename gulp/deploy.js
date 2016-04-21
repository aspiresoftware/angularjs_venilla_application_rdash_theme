'use strict';

var gulp = require('gulp');
var rsync = require('rsyncwrapper');
var gutil = require('gulp-util');
var conf = require('./config');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

gulp.task('war', function () {
  runSequence('clean', 'build','wargenerate');
});

gulp.task('wargenerate', function () {
      gulp.src(['dist/**/*'])
      .pipe($.war({
        welcome: 'index.html',
        displayName: 'Gulp WAR'
      }))
      .pipe($.zip(conf.warFileName))
      .pipe(gulp.dest('war'));
});


gulp.task('deploy', ['war'], function() {
  rsync({
    ssh: true,
    src: './' + conf.paths.war + '/' + conf.warFileName,
    dest: conf.paths.serverPath + '/' + conf.warFileName,
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
    gutil.log(stdout);
  });
});
