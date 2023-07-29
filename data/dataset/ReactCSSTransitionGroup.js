"use strict";

var React = require("./React");

var ReactTransitionGroup = require("./ReactTransitionGroup");
var ReactCSSTransitionGroupChild = require("./ReactCSSTransitionGroupChild");

var ReactCSSTransitionGroup = React.createClass({displayName: 'ReactCSSTransitionGroup',
  propTypes: {
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      transitionEnter: true,
      transitionLeave: true
    };
  },

  _wrapChild: function(child) {
    // We need to provide this childFactory so that
    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
    // leave while it is leaving.
    return (
      ReactCSSTransitionGroupChild(
        {name:this.props.transitionName,
        enter:this.props.transitionEnter,
        leave:this.props.transitionLeave}, 
        child
      )
    );
  },

  render: function() {
    return this.transferPropsTo(
      ReactTransitionGroup( {childFactory:this._wrapChild}, 
        this.props.children
      )
    );
  }
});

module.exports = ReactCSSTransitionGroup;
