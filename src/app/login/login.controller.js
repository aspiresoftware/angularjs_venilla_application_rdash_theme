(function() {
  angular.module('nd')
    .controller('LoginController', loginController);

  function loginController(
    $scope,
    $state,
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
      // TODO: uncomment following
      // authPromise.then(loginSuccess, failure);
      $state.go('dashboard');
    }

    function loginSuccess (result) {
      $scope.user.accessToken = result.accessToken;
      $scope.user.refreshToken = result.refreshToken;
      $scope.user.expireDate = result.expireDate;
      $scope.user.status = result.status;
      //Create a new user session
      Session.create($scope.user);
    }

    function failure (error) {
      console.log(error);
    }
  }
})();
