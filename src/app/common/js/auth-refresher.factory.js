(function() {
  'use strict';
  angular.module('nd')
    .factory('AuthRefresher', AuthRefresher);

  /* @ngInject */
  function AuthRefresher(
    $log,
    $location,
    $q,
    APPLICATION,
    PAGE_URL,
    DelegatorService,
    LoginService,
    Session
  ) {
    $log = $log.context('AuthRefresher');
    var lockedForRefresh = false;

    return {
      refresh: refresh,
      interceptSessionExpired: interceptSessionExpired
    };

    function refresh(refreshToken) {
      var refreshPromise;

      if (lockedForRefresh) {
        return $q.reject('refresh already in progress');
      }

      lock();
      $log.debug('running token refresh request');

      if (angular.isUndefined(refreshToken)) {
        refreshToken = Session.refreshToken;
      }

      refreshPromise = LoginService.refreshToken(refreshToken)
        .then(onRefreshSuccess, onRefreshFail)
        .finally(unlock);

      return refreshPromise;
    }

    function interceptSessionExpired(httpResponse) {
      $log.debug('intercepting sessionExpired request');

      if (!lockedForRefresh) {
        refresh();
      }

      // queues the request pending refresh success
      return DelegatorService.http(httpResponse.config);
    }

    function onRefreshSuccess(result) {
      var tokenData = result.data;
      $log.debug('Successfully got new access token');

      Session.updateAuth(tokenData);
      DelegatorService.executeDelayedRequests();

      return result;
    }

    function onRefreshFail(result) {
      $log.error('Failure in getting token');

      DelegatorService.failDelayedRequests(result);
      $location.url(PAGE_URL.root);

      return result;
    }

    function lock() {
      lockedForRefresh = true;
      DelegatorService.synchronize(true);
    }

    function unlock() {
      lockedForRefresh = false;
      DelegatorService.synchronize(false);
    }
  }
})();
