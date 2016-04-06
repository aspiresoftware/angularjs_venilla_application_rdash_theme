(function() {
  'use strict';
  angular.module('nd')
    .factory('paramCache', ParamCacheFactory);

  /* @ngInject */
  function ParamCacheFactory(
    $angularCacheFactory,
    APPLICATION
  ) {
    var paramCache;
    var cacheName = APPLICATION.paramCache;
    var cacheOptions = {
      maxAge: 25000, // expired items in 25  seconds
      recycleFreq: 10000
    };

    paramCache = $angularCacheFactory.get(cacheName);
    paramCache = paramCache || $angularCacheFactory(cacheName, cacheOptions);

    return paramCache;
  }
})();
