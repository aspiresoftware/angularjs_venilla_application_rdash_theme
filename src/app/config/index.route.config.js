(function() {
  'use strict';

  angular.module('nd')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes (
    $stateProvider,
    $urlRouterProvider,
    PAGE_URL,
    TEMPLATE_URL
    ) {
  $urlRouterProvider.when('/dashboard', '/menu/dashboard');
    $stateProvider
      .state('login', {
        url: PAGE_URL.login,
        templateUrl: TEMPLATE_URL.login,
        controller: 'LoginController',
        controllerAs: 'loginController'
      })
      .state('404', {
        url: PAGE_URL.error404,
        templateUrl: TEMPLATE_URL.error404
      })
      .state('menu', {
        url: PAGE_URL.menu,
        templateUrl: TEMPLATE_URL.menu,
        controller: 'MenuCtrl'
      })
      .state('dashboard', {
        url: PAGE_URL.dashboard,
        templateUrl: TEMPLATE_URL.dashboard,
        parent:'menu',
        controller: 'MenuCtrl'
      })
      .state('tables', {
        url: PAGE_URL.tables,
        templateUrl: TEMPLATE_URL.tables,
        parent:'menu'
      });
    $urlRouterProvider.otherwise(PAGE_URL.login);
  }
})();
