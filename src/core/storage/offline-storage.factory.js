(function() {
  'use strict';
  angular.module('nd')
    .factory('OfflineStorage', OfflineStorage);

  /* @ngInject */
  function OfflineStorage($window, objectStorageFactory) {
    return objectStorageFactory(
      $window.localStorage,
      'OfflineStorage'
    );
  }
})();
