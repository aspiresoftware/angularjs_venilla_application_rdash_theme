(function() {
  angular.module('nd')
    .directive('ndPassword', password);

  function password() {
    return {
      restrict: 'E',
      scope: {
        ndLable: '@',
        ndId: '@',
        ngModel: '=',
        ndRequired: '='
      },
      templateUrl: '../components/fields/input/password/password.template.html'
    };
  }
})();
