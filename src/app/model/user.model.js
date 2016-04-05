(function () {
  'use strict';

  angular.module('nd')
    .factory('User', User);

  /* @ngInject */
  function User () {
    return {
      'username': '',
      'password': '',
      'access_token': '',
      'expire_date': '',
      'refresh_token': '',
      'status': ''
    };
  }
})();
