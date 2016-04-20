(function() {
  angular.module('nd')
    .directive('ndTextBox', textBox);

  function textBox() {
    return {
      restrict: 'E',
      scope: {
        ndLable: '@',
        ndId: '@',
        ngModel: '=',
        ndRequired: '='
      },
      templateUrl: 'components/fields/input/textbox/textbox.template.html'
    };
  }
})();
