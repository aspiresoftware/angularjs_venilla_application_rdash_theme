(function() {
  angular.module('nd')
    .factory('Utility', Utility);

  function Utility() {
    return {
      pruneEmpty: pruneEmpty,
      snakeToCamelCase: snakeToCamelCase,
      snakeToCamelCaseReplacer: snakeToCamelCaseReplacer,
      camelToSnakeCase: camelToSnakeCase,
      camelToSnakeCaseReplacer: camelToSnakeCaseReplacer
    };

    function pruneEmpty(obj) {
      return function prune(current) {
        _.forOwn(current, function (value, key) {
          if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
            (_.isString(value) && _.isEmpty(value)) ||
            (_.isObject(value) && _.isEmpty(prune(value)))) {

            delete current[key];
          }
        });
        // remove any leftover undefined values from the delete
        // operation on an array
        if (_.isArray(current)) {
          _.pull(current, undefined);
        }
        return current;

      }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
    }

    function snakeToCamelCase(response) {
      //Convert response keys from snake to camel case
      if (typeof response !== 'object') {
        return response;
      }
      for (var prop in response) {
        if (response.hasOwnProperty(prop)) {
          var replacedKey = prop.replace(/(\_\w)/g, snakeToCamelCaseReplacer);
          response[replacedKey] = snakeToCamelCase(response[prop]);
          if (prop.indexOf('_') > -1) {
            delete response[prop];
          }
        }
      }
      return response;
    }

    function snakeToCamelCaseReplacer(input) {
      return input[1].toUpperCase();
    }

    function camelToSnakeCase(requestParams) {
      //Convert response keys from camel to snake case
      if (typeof requestParams !== 'object') {
        return requestParams;
      }
      for (var prop in requestParams) {
        if (requestParams.hasOwnProperty(prop)) {
          var replacedKey = prop.replace(/([A-Z])/g, camelToSnakeCaseReplacer);
          requestParams[replacedKey] = camelToSnakeCase(requestParams[prop]);
          if (prop.toLowerCase() !== prop) {
            delete requestParams[prop];
          }
        }
      }
      return requestParams;
    }

    function camelToSnakeCaseReplacer(input) {
      return '_' + input.toLowerCase();
    }
  }
})();
