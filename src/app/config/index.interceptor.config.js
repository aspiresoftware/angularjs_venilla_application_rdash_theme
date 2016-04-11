(function() {
  angular.module('nd')
    .config(config$ResourceProvider)
    .run(registerAuthEventListeners);

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

  /* @ngInject */
  function registerAuthEventListeners(
    $rootScope,
    AUTH_EVENTS,
    Session,
    AUTH_MESSAGE
    ) {
    //hendled 400: AUTH_EVENTS.badRequest
    $rootScope.$on(AUTH_EVENTS.badRequest, function onBadRequest(ev, resp, badRequest) {
      if (resp && resp.data && resp.data.error && resp.data.error.message) {
        badRequest = resp.data.error.message;
      }
      console.log(badRequest);
    });

    //hendled 401: AUTH_EVENTS.notAuthenticated
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function onNotAuthenticated() {
      var message = Session.isLoggedIn ?
        AUTH_MESSAGE.notAuthenticatedPasswordChanged :
        AUTH_MESSAGE.notAuthenticated;

      Session.logout();
      console.log(message);
    });

    //hendled 403: AUTH_EVENTS.notAuthorized
    $rootScope.$on(AUTH_EVENTS.notAuthorized, function onNotAuthorized(ev, resp, forbiddenRequest) {
      console.log(forbiddenRequest);
    });

    //hendled 404: AUTH_EVENTS.notFound
    $rootScope.$on(AUTH_EVENTS.notFound, function onNotFound(ev, resp, notFoundRequest) {
      console.log(notFoundRequest);
    });

    //hendled 408: AUTH_EVENTS.requestTimeout
    $rootScope.$on(AUTH_EVENTS.requestTimeout, function onRequestTimeout(ev, resp, requestTimeout) {
      console.log(requestTimeout);
    });

    // Handle 415: AUTH_EVENTS.upgradeRequired
    var displayedUpgradeNotice = false;
    $rootScope.$on(AUTH_EVENTS.upgradeRequired, function onUpgradeRequired(ev, resp) {
      if (displayedUpgradeNotice) {
        return;
      }
      displayedUpgradeNotice = true;

      if (resp && resp.data) {
        resp = resp.data;
      }

      var message;
      if (resp.error && resp.error.message) {
        message = resp.error.message;
      } else {
        message = 'This version of the application is no longer supported. ' +
          'Please upgrade to the latest version.';
      }

      console.log(message);
    });

    //hendled 422: AUTH_EVENTS.unprocessableEntity
    $rootScope.$on(AUTH_EVENTS.unprocessableEntity, function onUnprocessableEntity(event, resp) {
      console.log('unprocessableEntity');
    });

    //hendled 429: AUTH_EVENTS.tooManyRequests
    $rootScope.$on(
      AUTH_EVENTS.tooManyRequests,
      function onTooManyRequests(ev, resp, tooManyRequests) {
        console.log(tooManyRequests);
      }
    );

    //hendled 500: AUTH_EVENTS.internalServerError
    $rootScope.$on(
      AUTH_EVENTS.internalServerError,
      function onServerError(ev, resp, internalServerError) {
        console.log(internalServerError);
      }
    );

    //hendled 501: AUTH_EVENTS.notImplemented
    $rootScope.$on(AUTH_EVENTS.notImplemented, function onNotImplemented(ev, resp, notImplemented) {
      console.log(notImplemented);
    });

    //hendled 503: AUTH_EVENTS.serviceUnavailable
    $rootScope.$on(
      AUTH_EVENTS.serviceUnavailable,
      function onServiceUnavailable(event, resp, serviceUnavailable) {
        console.log(serviceUnavailable);
      }
    );

    //hendled 504: AUTH_EVENTS.gatewayTimeout
    $rootScope.$on(
      AUTH_EVENTS.gatewayTimeout,
      function onGatewayTimeout(event, resp, gatewayTimeout) {
        console.log(gatewayTimeout);
      }
    );

    //hendled 520-524: AUTH_EVENTS.proxyErrors
    $rootScope.$on(AUTH_EVENTS.proxyErrors, function onProxyErrors(event, resp, proxyErrors) {
      console.log(proxyErrors);
    });

    //hendled 0: AUTH_EVENTS.networkIssue
    $rootScope.$on(AUTH_EVENTS.networkIssue, function onNetworkIssue(event, resp, networkIssue) {
      console.log(networkIssue);
    });
  }
})();
