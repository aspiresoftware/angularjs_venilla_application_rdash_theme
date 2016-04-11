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
        authentication: authentication
      });

    return loginService;

    function authentication (user) {
      return DelegatorService.post(urls.loginUrl, user);
    }
  }
})();
