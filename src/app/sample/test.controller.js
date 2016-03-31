(function () {
  'use strict';

  angular.module('myApp')
    .controller('Test', Test);

  /* @ngInject */
  function Test (
    $scope,
    modelFactory) {
    var modelData = {
      fname: '',
      lname: ''
    };
    $scope.user = modelFactory.create('user', modelData);
  }
})();
