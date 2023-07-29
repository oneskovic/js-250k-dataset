var React = require('React');

var onlyChild = require('onlyChild');

/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   var someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticContainer>
 *       <MyComponent value={someValue} />
 *     </StaticContainer>
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */
var StaticContainer = React.createClass({

  shouldComponentUpdate: function(nextProps) {
    return nextProps.shouldUpdate;
  },

  render: function() {
    return onlyChild(this.props.children);
  }

});

module.exports = StaticContainer;
