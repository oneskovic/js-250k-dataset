define(function (require, exports, module) {

var React = require('react');
var BootstrapMixin = require('./BootstrapMixin');
var cloneWithProps = require('./utils/cloneWithProps');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var Nav = require('./Nav');
var NavItem = require('./NavItem');

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey;

  ValidComponentChildren.forEach(children, function(child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.key;
    }
  });

  return defaultActiveKey;
}

var TabbedArea = React.createClass({displayName: 'TabbedArea',
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    animation: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsStyle: "tabs",
      animation: true
    };
  },

  getInitialState: function () {
    var defaultActiveKey = this.props.defaultActiveKey != null ?
      this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

    // TODO: In __DEV__ mode warn via `console.warn` if no `defaultActiveKey` has
    // been set by this point, invalid children or missing key properties are likely the cause.

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },

  handlePaneAnimateOutEnd: function () {
    this.setState({
      previousActiveKey: null
    });
  },

  render: function () {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    var nav = this.transferPropsTo(
      Nav( {activeKey:activeKey, onSelect:this.handleSelect, ref:"tabs"}, 
        ValidComponentChildren.map(this.props.children, renderTabIfSet, this)
      )
    );

    return (
      React.DOM.div(null, 
        nav,
        React.DOM.div( {id:this.props.id, className:"tab-content", ref:"panes"}, 
          ValidComponentChildren.map(this.props.children, this.renderPane)
        )
      )
    );
  },

  getActiveKey: function () {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane: function (child) {
    var activeKey = this.getActiveKey();

    return cloneWithProps(
        child,
        {
          active: (child.props.key === activeKey &&
            (this.state.previousActiveKey == null || !this.props.animation)),
          ref: child.props.ref,
          key: child.props.key,
          animation: this.props.animation,
          onAnimateOutEnd: (this.state.previousActiveKey != null &&
            child.props.key === this.state.previousActiveKey) ? this.handlePaneAnimateOutEnd: null
        }
      );
  },

  renderTab: function (child) {
    var key = child.props.key;
    return (
      NavItem(
        {ref:'tab' + key,
        key:key}, 
        child.props.tab
      )
    );
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function (key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    } else if (key !== this.getActiveKey()) {
      this.setState({
        activeKey: key,
        previousActiveKey: this.getActiveKey()
      });
    }
  }
});

module.exports = TabbedArea;
});
