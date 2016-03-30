(function () {
  'use strict';

  angular.module('myApp')
    .controller('Test', Test);

  /* @ngInject */
  function Test ($scope) {
    $scope.name = 'world';
  }
})();
