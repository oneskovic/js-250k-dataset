jqmModule.directive('jqmFlip', [function () {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    templateUrl: 'templates/jqmFlip.html',
    scope: {
      onLabel: '@',
      onValue: '@',
      offLabel: '@',
      offValue: '@',
      mini: '@',
      disabled: '@'
    },
    require: ['?ngModel', '^?jqmControlgroup'],
    link: function (scope, element, attr, ctrls) {
      var ngModelCtrl = ctrls[0];
      var jqmControlGroupCtrl = ctrls[1];
      var parsedOn;
      var parsedOff;

      scope.theme = scope.$theme || 'c';
      scope.isMini = isMini;
      scope.onValue = angular.isDefined(attr.onValue) ? scope.onValue : true;
      scope.offValue = angular.isDefined(attr.offValue) ? scope.offValue : false;

      initToggleState();
      bindClick();

      function initToggleState () {
        ngModelCtrl.$parsers.push(parseBoolean);
        parsedOn = parseBoolean(scope.onValue);
        parsedOff = parseBoolean(scope.offValue);
        ngModelCtrl.$render = updateToggleStyle;
        ngModelCtrl.$viewChangeListeners.push(updateToggleStyle);
      }

      function updateToggleStyle () {
        updateNaNAsOffValue();
        var toggled = isToggled();
        scope.toggleLabel = toggled ? scope.onLabel : scope.offLabel;
        scope.onStyle = toggled ? 100 : 0;
        scope.offStyle = toggled ? 0 : 100;
      }

      // this has to be done in the change listener,
      // otherwise the potential scope value would be overwritten with the off value
      function updateNaNAsOffValue () {
        if (!ngModelCtrl.$viewValue) {
          ngModelCtrl.$setViewValue(parsedOff);
        }
      }

      function bindClick () {
        scope.toggle = function () {
          ngModelCtrl.$setViewValue(isToggled() ? parsedOff : parsedOn);
        };
      }

      function isToggled () {
        return ngModelCtrl.$viewValue === parsedOn;
      }

      function isMini() {
        return scope.mini || (jqmControlGroupCtrl && jqmControlGroupCtrl.$scope.mini);
      }

      function parseBoolean(value) {
        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return false;
        }
        return value;
      }
    }
  };
}]);
