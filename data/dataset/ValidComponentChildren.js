define(["exports", "module", "react"], function (exports, module, _react) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  
  function mapValidComponents(children, func, context) {
    var index = 0;

    return React.Children.map(children, function (child) {
      if (React.isValidElement(child)) {
        var lastIndex = index;
        index++;
        return func.call(context, child, lastIndex);
      }

      return child;
    });
  }

  /**
   * Iterates through children that are typically specified as `props.children`,
   * but only iterates over children that are "valid components".
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child with the index reflecting the position relative to "valid components".
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc.
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachValidComponents(children, func, context) {
    var index = 0;

    return React.Children.forEach(children, function (child) {
      if (React.isValidElement(child)) {
        func.call(context, child, index);
        index++;
      }
    });
  }

  /**
   * Count the number of "valid components" in the Children container.
   *
   * @param {?*} children Children tree container.
   * @returns {number}
   */
  function numberOfValidComponents(children) {
    var count = 0;

    React.Children.forEach(children, function (child) {
      if (React.isValidElement(child)) {
        count++;
      }
    });

    return count;
  }

  /**
   * Determine if the Child container has one or more "valid components".
   *
   * @param {?*} children Children tree container.
   * @returns {boolean}
   */
  function hasValidComponent(children) {
    var hasValid = false;

    React.Children.forEach(children, function (child) {
      if (!hasValid && React.isValidElement(child)) {
        hasValid = true;
      }
    });

    return hasValid;
  }

  module.exports = {
    map: mapValidComponents,
    forEach: forEachValidComponents,
    numberOf: numberOfValidComponents,
    hasValidComponent: hasValidComponent
  };
});