(function() {
  'use strict';
  angular.module('nd')
    .factory('InMemoryStorage', InMemoryStorage);

  /* @ngInject */
  function InMemoryStorage(basicStorageFactory, objectStorageFactory) {
    return objectStorageFactory(
      basicStorageFactory('InMemoryStorage'),
      'InMemoryStorage'
    );
  }
})();
