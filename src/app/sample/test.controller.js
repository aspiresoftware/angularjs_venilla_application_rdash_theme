(function () {
  'use strict';

  angular.module('nd')
    .controller('Test', Test);

  /* @ngInject */
  function Test (
    $scope,
    modelFactory,
    delegatorService,
    User
    ) {
    $scope.user = modelFactory.create('user', User);
    var url = 'users';
    var userlist = delegatorService.resourceService(url);

    userlist.query(function(successResult) {
      $scope.list = successResult;
    }, function(errorResult) {
      console.log('Error: ' + errorResult);
    });
  }
})();
