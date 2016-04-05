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
      return LoginService.authentication($scope.user);
    }
  }
})();
