'use strict';

var path = require('path'),
gulp     = require('gulp'),
conf     = require('./config');
copyFonts  = copyFonts;

// Load plugins to $.pluginName
var $ = require('gulp-load-plugins')({
  DEBUG: true,
  pattern: ['gulp-*', 'uglify-save-license', 'del', 'merge-stream']
});

function copyFonts() {
 return  gulp.src(path.join(conf.paths.tmp,'/serve/fonts/**/*'))
  .pipe(gulp.dest(path.join(conf.paths.dist , '/fonts/')));
}

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*.html')
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
      module: 'nd'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'))
    .pipe($.size());
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(
      path.join(conf.paths.tmp, '/partials/templates.js'
    ), {
      read: false
    });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var cssFilter = /\.css$/;
  var htmlFilter = /\.html$/;
  var jsFilter = /\.js$/;
  var fontFilter = /\.(eot,svg,ttf,woff,woff2)$/;
  // Patched version of gulp-useref required for sourcemaps option
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe($.if(jsFilter, $.ngAnnotate()))
    .pipe($.if(jsFilter, $.uglify({preserveComments: $.uglifySaveLicense})))
    .on('error', conf.errorHandler('Uglify'))
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.if(cssFilter, $.minifyCss({
      processImport: false
    })))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if(htmlFilter,$.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    })))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.if(fontFilter, copyFonts()))
    .pipe($.size({
      title: path.join(conf.paths.dist, '/'), showFiles: true
    }));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'),
   path.join(conf.paths.tmp, '/'), path.join(conf.paths.war, '/')]);
});

gulp.task('build', ['html', 'images', 'fonts']);
