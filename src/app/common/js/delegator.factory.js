(function () {
  'use strict';

  angular.module('nd')
    .factory('DelegatorService', delegatorService);

  /* @ngInject */
  function delegatorService (
    $resource,
    Session,
    Base64,
    $q,
    APPLICATION,
    Utility
    ) {

    //Holds all the requests, so they can be re-requested in future.
    var runningRequests = {};
    var delayedRequests = {};
    var requestCounter  = 0;
    var syncMode        = false;

    return {
      resourceService: resourceService,
      http:                   http,
      get:                    get,
      post:                   post,
      put:                    put,
      remove:                 remove,
      isSyncrhonized:         isSyncrhonized,
      synchronize:            synchronize,
      executeDelayedRequests: executeDelayedRequests,
      failDelayedRequests:    failDelayedRequests
    };

    function resourceService (config) {
      /*
      Set header in methods which will come inside config
       */
      return $resource(config.url, {}, {
        GET: {
          method: 'GET',
          isArray: true
        },
        POST: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        },
        PUT: {
          method: 'PUT'
        },
        DELETE: {
          method: 'DELETE'
        }
      });
    }

    function nextRequestId() {
      // Increment requestCounter and return new number as a string
      return '' + (requestCounter = requestCounter + 1);
    }

    function executeDelayedRequests() {
      angular.forEach(
        delayedRequests,
        function(tracker, requestId) {
          var config   = tracker.config;
          var deferred = tracker.deferred;

          executeHttp(config).then(
            angular.bind(deferred, deferred.resolve),
            angular.bind(deferred, deferred.reject),
            angular.bind(deferred, deferred.notify)
          );

          delete delayedRequests[requestId];
        }
      );
    }

    function failDelayedRequests(data) {
      angular.forEach(
        delayedRequests,
        function(tracker, requestId) {
          var deferred = tracker.deferred;

          deferred.reject(data);

          delete delayedRequests[requestId];
        }
      );
    }

    function http(config) {
      var promise;

      if (syncMode && !config.noDelay) {
        promise = delayHttp(config);
      } else {
        promise = executeHttp(config);
      }

      return promise;
    }

    function executeHttp(config) {
      config               = prepareRequest(config || {});

      var alreadyResolved  = false;
      var requestId        = nextRequestId();
      /*var promise          = httpizePromise(config, $http(config).then(finalize, httpReject));*/
      var resource = resourceService(config);
      var promise = resource[config.method](config.data).$promise;
      promise.then(finalize, httpReject);
      var tracker          = {id: requestId, config: config, promise: promise};

      if (!alreadyResolved) {
        runningRequests[requestId] = tracker;
      }

      return promise;

      function httpReject(result) {
        // Return a rejected promise to bubble failures
        return $q.reject(finalize(result));
      }

      function finalize(result) {
        console.log(result);
        if (runningRequests[requestId]) {
          delete runningRequests[requestId];
        } else {
          alreadyResolved = true;
        }
        var promise = result.$promise,
          resolved = result.$resolved,
          newResult = {};
        delete result.$promise;
        delete result.$resolved;
        newResult.$promise = promise;
        newResult.$resolved = resolved;
        newResult.data = result;
        if (newResult && newResult.data) {
          newResult.data = Utility.snakeToCamelCase(newResult.data);
        }

        return newResult;
      }
    }

    function delayHttp(config) {
      config          = prepareRequest(config || {});
      var deferred    = $q.defer();
      var requestId   = nextRequestId();
      var tracker     = {id: requestId, config: config, deferred: deferred};

      delayedRequests[requestId] = tracker;

      return httpizePromise(config, deferred.promise);
    }

    function get(url, params, customConfig) {
      //Manage own caching while using the $http service
      return http(buildShortcutConfig('GET', url, params, customConfig));
    }

    function post(url, params, customConfig) {
      return http(buildShortcutConfig('POST', url, params, customConfig));
    }

    function put(url, params, customConfig) {
      return http(buildShortcutConfig('PUT', url, params, customConfig));
    }

    function remove(url, params, customConfig) {
      return http(buildShortcutConfig('DELETE', url, params, customConfig));
    }

    function buildShortcutConfig(method, url, data, customConfig) {
      var config = angular.extend({}, customConfig || {});

      config.method = method;
      config.url    = url;

      if (method === 'POST' || method === 'PUT') {
        data = Utility.pruneEmpty(data);

        config.data   = data || {};
      } else {
        config.params = data || {};
      }

      return config;
    }

    function isSyncrhonized() {
      return syncMode;
    }

    function synchronize(modeEnabled) {
      if (angular.isUndefined(modeEnabled)) {
        modeEnabled = true;
      }

      if (syncMode && !modeEnabled) {
        // turn off sync mode
        syncMode = false;
      } else if (!syncMode && modeEnabled) {
        // turn on sync mode
        syncMode = true;
      }

      return syncMode;
    }

    function prepareRequest (inputConfig) {
      var config            = angular.extend({headers: {}}, inputConfig),
      url               = config.url || '',
      urlNeedsExpansion = !(/^\w+:\/\//.test(url)) && !config.domainAlreadyAdded,
      headers           = config.headers,
      params            = {};

      if (urlNeedsExpansion) {
        config.url = APPLICATION.host + url;
      }

      if (angular.isObject(config.params)) {
        angular.extend(params, config.params);
        config.params = Utility.camelToSnakeCase(config.params);
      }

      if (angular.isObject(config.data)) {
        angular.extend(params, config.data);
        config.data   = Utility.camelToSnakeCase(config.data);
      }
      headers = addAuth(config, params, headers);


      return config;
    }

    function addAuth(config, params, headers) {
      var authHeader        = null;
      if (!config.noAuth) {
        if (params.username && params.password) {
          authHeader = 'Basic ' + Base64.encode(params.username + ':' + params.password);
        } else if (params.refreshToken) {
          authHeader = 'Bearer ' + params.refreshToken;
        } else {
          var accessToken = params.accessToken || Session.accessToken;
          if (accessToken) {
            authHeader = 'Bearer ' + accessToken;
          }
        }

        if (authHeader) {
          headers.Authorization = authHeader;
        }
      }
      return headers;
    }


    function httpizePromise(config, promise) {
      promise.success = function(fn) {
        promise.then(function(response) {
          fn(response.data, response.status, response.headers, config);
        });
        return promise;
      };

      promise.error   = function(fn) {
        promise.then(null, function(response) {
          fn(response.data, response.status, response.headers, config);
        });
        return promise;
      };

      return promise;
    }
  }
})();
