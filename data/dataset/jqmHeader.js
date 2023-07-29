jqmModule.directive('jqmHeader', ['jqmConfig', function (jqmConfig) {
  return {
    restrict: 'A',
    // Own scope as we have a different default theme
    // than the page.
    scope: true,
    controller: angular.noop,
    link: function (scope, element, attr) {
      element.parent().data("jqmHeader", element);
      var hasExplicitTheme = scope.hasOwnProperty('$theme');
      if (!hasExplicitTheme) {
        scope.$theme = jqmConfig.secondaryTheme;
      }
      element.addClass("ui-header ui-bar-"+scope.$theme);
    }
  };
}]);

angular.forEach(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'], function (headerName) {
  jqmModule.directive(headerName, hxDirective);
});
function hxDirective() {
  return {
    restrict: 'E',
    require: ['?^jqmHeader', '?^jqmFooter'],
    compile: function () {
      return function (scope, element, attrs, ctrls) {
        var i;
        for (i=0; i<ctrls.length; i++) {
          if (ctrls[i]) {
            element.addClass("ui-title");
            break;
          }
        }
      };
    }
  };
}
