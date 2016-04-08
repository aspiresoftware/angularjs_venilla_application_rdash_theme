(function() {
  angular.module('nd')
    .factory('StoredObject', DefineStoredObject);

  /* @ngInject */
  function DefineStoredObject($log) {
    $log = $log.context('StoredObject');

    StoredObject.prototype.fetch      = fetch;
    StoredObject.prototype.store      = store;
    StoredObject.prototype.update     = update;
    StoredObject.prototype.getItem    = getItem;
    StoredObject.prototype.setItem    = setItem;
    StoredObject.prototype.removeItem = removeItem;
    StoredObject.prototype.clear      = clear;

    return StoredObject;

    function StoredObject(storage, name) {
      this.storage = storage;
      this.name    = name;
    }

    function fetch() {
      var data = {};
      try {
        data = this.storage.getItem(this.name);
      } catch (e) {
        data = {};
      }

      data = data || {};

      if (!angular.isObject(data)) {
        $log.warn(
          'Data loaded from ' + this.storage.name + ' is not a normal object -- ignoring value'
        );
        data = {};
      }

      return data;
    }

    function store(newData) {
      this.storage.setItem(this.name, newData);
    }

    function update(changes) {
      var savedData   = this.fetch();
      var updatedData = angular.extend(savedData, changes || {});
      this.store(savedData);
      return updatedData;
    }

    function getItem(key) {
      return this.fetch()[key];
    }

    function setItem(key, value) {
      var savedData   = this.fetch();
      savedData[key]  = value;
      this.store(savedData);
    }

    function removeItem(key) {
      var savedData = this.fetch();
      delete savedData[key];
      this.store(savedData);
    }

    function clear() {
      this.storage.removeItem(this.name);
    }
  }
})();
