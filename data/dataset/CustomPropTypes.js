define(["exports", "module"], function (exports, module) {
  "use strict";

  var ANONYMOUS = "<<anonymous>>";

  var CustomPropTypes = {
    
    mountable: createMountableChecker()
  };

  /**
   * Create chain-able isRequired validator
   *
   * Largely copied directly from:
   *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
   */
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName) {
      componentName = componentName || ANONYMOUS;
      if (props[propName] == null) {
        if (isRequired) {
          return new Error("Required prop `" + propName + "` was not specified in " + "`" + componentName + "`.");
        }
      } else {
        return validate(props, propName, componentName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createMountableChecker() {
    function validate(props, propName, componentName) {
      if (typeof props[propName] !== "object" || typeof props[propName].render !== "function" && props[propName].nodeType !== 1) {
        return new Error("Invalid prop `" + propName + "` supplied to " + "`" + componentName + "`, expected a DOM element or an object that has a `render` method");
      }
    }

    return createChainableTypeChecker(validate);
  }

  module.exports = CustomPropTypes;
});