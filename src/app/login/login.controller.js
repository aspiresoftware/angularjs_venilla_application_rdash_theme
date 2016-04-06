(function() {
  angular.module('nd')
    .controller('LoginController', loginController);

  function loginController(
    $scope,
    modelFactory,
    User,
    LoginService
    ) {

    $scope.user = modelFactory.create('user', User);

    $scope.login = login;

    function login() {
      var authPromise = LoginService.authentication($scope.user);
      return authPromise;
      /*authPromise.$promise.then(function(result) {
        $scope.user.access_token = result.access_token;
        $scope.user.refresh_token = result.refresh_token;
        $scope.user.expire_date = result.expire_date;
        $scope.user.status = result.status;
        return $scope.user;
      });*/
    }
  }
})();
