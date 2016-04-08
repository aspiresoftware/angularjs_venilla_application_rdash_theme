(function() {
  angular.module('nd')
    .controller('LoginController', loginController);

  function loginController(
    $scope,
    modelFactory,
    User,
    LoginService,
    Session
    ) {

    $scope.user = modelFactory.create('user', User);

    $scope.login = login;

    function login() {
      var authPromise = LoginService.authentication($scope.user);
      /*return authPromise;*/
      authPromise.$promise.then(loginSuccess, failure);
    }

    function loginSuccess (result) {
      $scope.user.access_token = result.access_token;
      $scope.user.refresh_token = result.refresh_token;
      $scope.user.expire_date = result.expire_date;
      $scope.user.status = result.status;
      //Create a new user session
      Session.create($scope.user);
    }

    function failure (error) {
      console.log(error);
    }
  }
})();
