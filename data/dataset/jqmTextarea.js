jqmModule.directive('jqmTextarea', ['textareaDirective', function (textareaDirective) {
  return {
    templateUrl: 'templates/jqmTextarea.html',
    replace: true,
    restrict: 'A',
    require: '?ngModel',
    scope: {
      disabled: '@'
    },
    link: function (scope, element, attr, ngModelCtrl) {
      var textarea = angular.element(element[0]);

      linkInput();

      function linkInput() {
        textarea.bind('focus', function () {
          element.addClass('ui-focus');
        });
        textarea.bind('blur', function () {
          element.removeClass('ui-focus');
        });

        angular.forEach(textareaDirective, function (directive) {
          directive.link(scope, textarea, attr, ngModelCtrl);
        });
        return textarea;
      }
    }
  };
}]);
