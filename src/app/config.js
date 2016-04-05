(function() {
  'use strict';

  angular.module('nd')
  .constant('APPLICATION', {
    host: 'http://192.168.1.71:80/api/v1'
  })
  .constant('REST_URL', {
    login: '/user/login/?format=json'
  })
  .constant('PAGE_URL', {
    root: '/',
    error404: '/404'
  })
  .constant('TEMPLATE_URL', {
    login: 'app/login/login.html',
    error404: 'app/common/html/404.html'
  });
})();
