'use strict';

var gulp = require('gulp'),
ngrok = require('ngrok'),
psi = require('psi'),
config = require('./config'),
port = config.serverUrlPort;


/*var key = '';*/

// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key.
// For more info:
// https://developers.google.com/speed/docs/insights/v2/getting-started

gulp.task('mobile', function () {
   ngrok.connect(port, function (err, url) {
    return psi(url, {
      key: config.pagespeedInsightKey,
      strategy: 'mobile'
    }).then(function (data) {
      console.log('Speed score: ' + data.ruleGroups.SPEED.score);
      console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
      ngrok.disconnect();
      ngrok.kill();
    });
  });

});

gulp.task('desktop', function () {
  ngrok.connect(port, function (err, url) {
    return psi(url, {
      key: config.pagespeedInsightKey,
      strategy: 'desktop'
    }).then(function (data) {
      console.log('Speed score: ' + data.ruleGroups.SPEED.score);
      ngrok.disconnect();
      ngrok.kill();
    });
  });
});
