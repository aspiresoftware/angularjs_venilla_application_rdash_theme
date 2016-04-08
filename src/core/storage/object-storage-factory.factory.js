(function() {
  angular.module('nd')
    .factory('objectStorageFactory', objectStorageFactory);

  /* @ngInject */
  function objectStorageFactory(StoredObject) {
    return function objectStorage(innerStorage, name) {
      return {
        getItem:      getItem,
        setItem:      setItem,
        removeItem:   removeItem,
        clear:        clear,
        storedObject: storedObject,
        name:         name
      };

      function getItem(key) {
        var value = innerStorage.getItem(key);
        if (angular.isString(value)) {
          value = JSON.parse(value);
        }
        return value;
      }

      function setItem(key, value) {
        innerStorage.setItem(key, JSON.stringify(value));
      }

      function removeItem(key) {
        innerStorage.removeItem(key);
      }

      function clear() {
        innerStorage.clear();
      }

      function storedObject(name) {
        /* jshint validthis:false */
        return new StoredObject(this, name);
      }
    };
  }
})();
