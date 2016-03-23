'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();
var _ = require('lodash');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;

gulp.task('styles', function () {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/styles/style.scss')
  ], {
    read: false
  });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/styles/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/styles/style.scss')
  ])
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.sass({outputStyle: 'compact'}))
    .pipe($.autoprefixer(
        {
          browsers: [
            'last 2 versions',
            'ie >= 9',
            'ios_saf >= 7'
          ]
        }
      )).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size());
});
