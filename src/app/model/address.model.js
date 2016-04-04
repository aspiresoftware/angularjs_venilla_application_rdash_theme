(function () {
  'use strict';

  angular.module('myApp')
    .factory('Address', Address);

  /* @ngInject */
  function Address (
    Geo
    ) {
    return {
      'street': '',
      'suite': '',
      'city': '',
      'zipcode': '',
      'geo': Geo
    };
  }
})();
