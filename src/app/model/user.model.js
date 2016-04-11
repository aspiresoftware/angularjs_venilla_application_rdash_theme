(function () {
  'use strict';

  angular.module('nd')
    .factory('User', User);

  /* @ngInject */
  function User () {
    return {
      'username': '',
      'password': '',
      'accessToken': '',
      'expireDate': '',
      'refreshToken': '',
      'status': ''
    };
  }
})();
