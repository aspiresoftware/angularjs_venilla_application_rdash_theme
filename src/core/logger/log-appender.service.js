// (function() {
//   'use strict';

//   angular.module('bp.core')
//     .service('LogAppenderService', LogAppenderService);

//   /* @ngInject */
//   function LogAppenderService($window) {
//     var localStorage = $window.localStorage;
//     // Avoid circular dependency
//     var $timeout = window.setTimeout;

//     if (localStorage) {
//       var lsKey = 'com.ebackpack.parents.logs';
//       var pendingChanges = false;
//       var timeoutInterval = 15000; // 15 seconds
//       // 100 * 2048 = 250KB max storage, should be much less.
//       // Keeping it low helps ensure we receive error reports.
//       var maxEntries = 100;
//       var maxEntrySize = 2048;
//       var logRoll = deserialize();

//       synchronizeLog();
//     }

//     return {
//       getLogs: getLogs,
//       log: storeLog
//     };

//     function deserialize() {
//       return JSON.parse(localStorage.getItem(lsKey)) || [];
//     }

//     function getLogs() {
//       return logRoll;
//     }

//     function serialize() {
//       if (pendingChanges) {
//         localStorage.setItem(lsKey, stringify(logRoll));
//         pendingChanges = false;
//       }
//     }

//     function storeLog(logArgs) {
//       if (!localStorage) {
//         return;
//       }

//       var logString = (logArgs || []).map(stringify).join(' ');
//       // Limit size of each string entry
//       logRoll.push(logString.substring(0, maxEntrySize));

//       // Limit total number of entries
//       while (logRoll.length > maxEntries) {
//         logRoll.shift();
//       }

//       pendingChanges = true;
//     }

//     function synchronizeLog() {
//       serialize();
//       // $timeout over $interval in case serialization is slower
//       $timeout(synchronizeLog, timeoutInterval);
//     }

//     function stringify(stringLike) {
//       if (stringLike instanceof Error) {
//         return stringLike.toString();
//       } else if (stringLike instanceof Array && stringLike[0] instanceof Error) {
//         return stringLike[0].toString();
//       }

//       return JSON.stringify(stringLike);
//     }
//   }

// })();
