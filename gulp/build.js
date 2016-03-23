'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

// Load plugins to $.pluginName
var $ = require('gulp-load-plugins')({
  DEBUG: true,
  pattern: ['gulp-*', 'uglify-save-license', 'del', 'merge-stream']
});

var mainBowerFiles = require('main-bower-files');

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.plumber({
      handleError: conf.errorHandler
    }))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache({
      module: 'myApp',
      root: 'templateCacheHtml.js'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'))
    .pipe($.size());
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(
      path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'
    ), {
      read: false
    });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', {
    restore: true
  });
  var jsFilter = $.filter('**/*.js', {
    restore: true
  });
  var cssFilter = $.filter('**/*.css', {
    restore: true
  });
  // Patched version of gulp-useref required for sourcemaps option
  var assets;

  return gulp.src('src/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe(conf.production ? $.uglify({
        preserveComments: $.uglifySaveLicense
      }) : $.util.noop()).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe(conf.production ? $.minifyCss({
        processImport: false
      }) : $.util.noop())
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe(conf.production ? $.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }) : $.util.noop())
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({
      title: path.join(conf.paths.dist, '/'), showFiles: true
    }));
});

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

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'images', 'fonts']);
