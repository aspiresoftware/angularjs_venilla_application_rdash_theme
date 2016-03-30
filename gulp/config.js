/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var chalk = require('chalk');
var util = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  styles: ['src/{app,components,core,styles}/**/*.scss'],
  images: ['src/assets/images/**/*'],
  serverPath: 'aspire16@aspire16:/home/aspire16/Software/apache-tomcat-7.0.47/webapps',
  war: 'war'
};

/**
 * Check whether task is running for production or not
 * @type {boolean : true/false}
 */
exports.production = !!util.env.production;

/**
 * Define name of war file here
 * @type {String}
 */
exports.warFileName = 'project.war';

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.css/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    console.error(chalk.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
