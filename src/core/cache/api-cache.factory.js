(function() {
  'use strict';
  angular.module('nd')
    .factory('apiCache', ApiCacheFactory);

  /* @ngInject */
  function ApiCacheFactory(
    CacheFactory,
    paramCache,
    DelegatorService,
    APPLICATION
  ) {
    var apiCache;
    var cacheName = APPLICATION.cache;
    var cacheOptions = {onExpire: onExpire};

    apiCache = CacheFactory.get(cacheName);
    apiCache = apiCache || CacheFactory(cacheName, cacheOptions);

    return apiCache;

    function onExpire(key) {
      DelegatorService.get(key, paramCache.get(key), true);
    }
  }
})();
