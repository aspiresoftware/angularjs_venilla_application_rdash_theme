(function () {
  'use strict';

  angular.module('myApp')
    .factory('User', User);

  /* @ngInject */
  function User (
    Address
    ) {
    return {
      'Address': Address,
      'company': '',
      'email': '',
      'id': '',
      'name': '',
      'phone': '',
      'username': '',
      'website': ''
    };
  }
})();
