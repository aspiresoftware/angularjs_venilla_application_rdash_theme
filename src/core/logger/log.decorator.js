(function() {
  angular.module('nd')
    .config(decorateLog);

  /* @ngInject */
  function decorateLog($provide) {
    $provide.decorator('$log', contextLogger);
  }

  /* @ngInject */
  function contextLogger($delegate, LogAppenderService) {
    // Add a context method to prefix original log functions
    $delegate.context = function logContext(ctx) {
      return {
        context: $delegate.context,
        debug: enhanceFn($delegate.debug, ctx),
        log: enhanceFn($delegate.log, ctx),
        info: enhanceFn($delegate.info, ctx),
        warn: enhanceFn($delegate.warn, ctx),
        error: enhanceFn($delegate.error, ctx)
      };
    };

    var funcsToWrap = ['debug', 'log', 'info', 'warn', 'error'];
    funcsToWrap.forEach(function(funcName) {
      $delegate[funcName] = enhanceFn($delegate[funcName]);
    });

    return $delegate;

    function enhanceFn(logFn, ctx) {
      return function newLogFn() {
        var args = Array.prototype.slice.call(arguments);

        try {
          var prefix = '';

          // No ctx means it's the original call, so prepend timestamp
          if (!ctx) {
            // All supported browsers have toISOString
            prefix += (new Date()).toISOString() + ' ';
          }

          // A ctx means a timestamp has already been applied
          if (ctx) {
            prefix += '[' + ctx + '] ';
          }

          if (args.length > 1) {
            // If more than 1 arg, insert prefix as the first
            args.unshift(prefix);
          } else if (args[0] && angular.isString(args[0])) {
            // First arg is a string, just prefix
            args[0] = prefix + args[0];
          }
        } catch (err) {
          // Don't modify arguments
        }

        // Call original function with (possibly modified) arguments.
        logFn.apply(null, args);

        // If this is the original $log.log call, append result to storage
        if (!ctx) {
          LogAppenderService.log(args);
        }
      };
    }
  }
})();
