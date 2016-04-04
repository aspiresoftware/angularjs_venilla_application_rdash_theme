(function () {
  'use strict';

  angular.module('myApp')
    .factory('delegatorService', delegatorService);

  /* @ngInject */
  function delegatorService (
    $resource,
    APPLICATION
    ) {
    return {
      resourceService: resourceService
    };

    function resourceService (url) {
      return $resource(APPLICATION.host + url);
    }
  }
})();
