(function() {
  'use strict';
  angular.module('nd')
    .factory('apiCache', ApiCacheFactory);

  /* @ngInject */
  function ApiCacheFactory(
    $angularCacheFactory,
    paramCache,
    DelegatorService,
    APPLICATION
  ) {
    var apiCache;
    var cacheName = APPLICATION.cache;
    var cacheOptions = {onExpire: onExpire};

    apiCache = $angularCacheFactory.get(cacheName);
    apiCache = apiCache || $angularCacheFactory(cacheName, cacheOptions);

    return apiCache;

    function onExpire(key) {
      DelegatorService.get(key, paramCache.get(key), true);
    }
  }
})();
