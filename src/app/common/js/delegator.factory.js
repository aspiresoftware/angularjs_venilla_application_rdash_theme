(function () {
  'use strict';

  angular.module('nd')
    .factory('DelegatorService', delegatorService);

  /* @ngInject */
  function delegatorService (
    $resource
    ) {
    return {
      resourceService: resourceService
    };

    function resourceService (url) {
      /*return $resource(APPLICATION.host + url);*/
      return $resource('http://jsonplaceholder.typicode.com/users');
    }
  }
})();
