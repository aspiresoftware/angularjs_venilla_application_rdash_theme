(function () {
  'use strict';

  angular.module('myApp')
    .value('Geo', Geo);

  /* @ngInject */
  function Geo () {
    return {
      'lat': '',
      'lng': ''
    };
  }
})();
