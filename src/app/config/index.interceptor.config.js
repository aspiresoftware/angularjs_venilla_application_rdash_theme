(function() {
  angular.module('nd')
    .config(config$ResourceProvider);

  /* @ngInject */
  function config$ResourceProvider(
    $httpProvider
  ) {
    // Use $applyAsync to improve performance of multiple HTTP requests
    // resolving very close to the same time.
    $httpProvider.useApplyAsync(true);

    // Configuration of http provider
    // registered interceptor for http provider
    $httpProvider.interceptors.push(
      /* @ngInject */
      function($injector) {
        return $injector.get('AuthInterceptor');
      }
    );
  }
})();
