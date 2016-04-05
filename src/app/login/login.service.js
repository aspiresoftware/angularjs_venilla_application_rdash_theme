(function() {
  angular.module('nd')
    .factory('LoginService', LoginService);

  function LoginService (
    REST_URL,
    delegatorService
    ) {
    return {
      authentication: authentication
    };

    function authentication (user) {
      var loginUrl = REST_URL.login;
      var resource = delegatorService.resourceService(loginUrl);
      var user = resource.save(function(user) {
        return user;
      })
    }
  }
})();
