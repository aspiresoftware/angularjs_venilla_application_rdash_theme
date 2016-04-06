(function() {
  'use strict';

  angular.module('nd')
  .config(configureRoutes);

  function configureRoutes (
    $stateProvider,
    $urlRouterProvider,
    PAGE_URL,
    TEMPLATE_URL
    ) {
    $stateProvider
      .state('login', {
        url: PAGE_URL.root,
        templateUrl: TEMPLATE_URL.login,
        controller: 'LoginController',
        controllerAs: 'loginController'
      })
      .state('404', {
        url: PAGE_URL.error404,
        templateUrl: TEMPLATE_URL.error404
      });
    $urlRouterProvider.otherwise(PAGE_URL.root);
  }
})();
