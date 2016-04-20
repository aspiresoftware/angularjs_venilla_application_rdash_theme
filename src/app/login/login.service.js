(function() {
  angular.module('nd')
    .factory('LoginService', LoginService);

  function LoginService (
    REST_URL,
    DelegatorService,
    urlTemplate,
    CachedRequestHandler
    ) {

    var loginService, urls;

    urls = {
      loginUrl: urlTemplate(REST_URL.login, {}, {type: 'post'})
    };

    loginService = angular.extend(
      {},
      CachedRequestHandler,
      {
        modelName: 'user',
        baseURL: urls.base,
        urls: urls
      },
      {
        authentication: authentication,
        refreshToken: refreshToken
      });

    return loginService;

    function authentication (user) {
      return DelegatorService.post(urls.loginUrl, user);
    }

    function refreshToken(refreshTokenValue) {
      var params  = {grantType: 'access_token', refreshToken: refreshTokenValue};
      var config  = {noDelay: true};

      return DelegatorService.post(REST_URL.authentication, params, config);
    }
  }
})();
