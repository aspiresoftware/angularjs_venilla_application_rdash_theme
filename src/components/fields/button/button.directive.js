(function() {
  angular.module('nd')
    .directive('ndButton', button);

  function button() {
    return {
      restrict: 'E',
      scope: {
        ndLable: '@',
        ndClick: '&'
      },
      templateUrl: '../components/fields/button/button.template.html',
      link: link
    };

    function link(scope) {
      scope.clickButton = function() {
        var promise = scope.ndClick();
        console.log(promise);
      };
    }
  }
})();
