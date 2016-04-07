(function () {
  'use strict';

  angular.module('nd')
    .factory('DelegatorService', delegatorService);

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
