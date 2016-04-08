(function() {
  'use strict';
  angular.module('nd')
    .factory('basicStorageFactory', basicStorageFactory);

  /* @ngInject */
  function basicStorageFactory($cacheFactory) {
    return function basicStorage(name) {
      var storage = $cacheFactory(name);

      return {
        getItem:    getItem,
        setItem:    setItem,
        removeItem: removeItem,
        clear:      clear
      };

      function getItem(key) {
        return storage.get(key);
      }

      function setItem(key, value) {
        storage.put(key, value.toString());
      }

      function removeItem(key) {
        storage.remove(key);
      }

      function clear() {
        storage.removeAll();
      }
    };
  }
})();
