(function() {
  angular.module('nd')
    .config(config$ResourceProvider);

  /* @ngInject */
  function config$ResourceProvider(
    $resourceProvider
  ) {
    console.log($resourceProvider);
  }
})();
