(function () {
  'use strict';

  angular.module('nd')
    .factory('modelFactory', modelFactory);

  /* @ngInject */
  function modelFactory () {
    return {
      create: create
    };

    function create (objectName, modelData) {
      return _.create(objectName, modelData);
    }
  }
})();
