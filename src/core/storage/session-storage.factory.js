(function() {
  'use strict';
  angular.module('nd')
    .factory('SessionStorage', SessionStorage);

  /* @ngInject */
  function SessionStorage($window, objectStorageFactory) {
    return objectStorageFactory(
      $window.sessionStorage,
      'SessionStorage'
    );
  }
})();
