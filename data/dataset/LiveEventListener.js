/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
* Event listener for events fired via the Deft.event.LiveEventBus.
* @private
*/

Ext.define('Deft.event.LiveEventListener', {
  alternateClassName: ['Deft.LiveEventListener'],
  requires: ['Ext.ComponentQuery'],
  constructor: function(config) {
    var component, components, _i, _len;
    Ext.apply(this, config);
    this.components = [];
    components = Ext.ComponentQuery.query(this.selector, this.container);
    for (_i = 0, _len = components.length; _i < _len; _i++) {
      component = components[_i];
      this.components.push(component);
      component.on(this.eventName, this.fn, this.scope, this.options);
    }
  },
  destroy: function() {
    var component, _i, _len, _ref;
    _ref = this.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      component.un(this.eventName, this.fn, this.scope);
    }
    this.components = null;
  },
  register: function(component) {
    if (this.matches(component)) {
      this.components.push(component);
      component.on(this.eventName, this.fn, this.scope, this.options);
    }
  },
  unregister: function(component) {
    var index;
    index = Ext.Array.indexOf(this.components, component);
    if (index !== -1) {
      component.un(this.eventName, this.fn, this.scope);
      Ext.Array.erase(this.components, index, 1);
    }
  },
  matches: function(component) {
    if (this.selector === null && this.container === component) {
      return true;
    }
    if (this.container === null && Ext.Array.contains(Ext.ComponentQuery.query(this.selector), component)) {
      return true;
    }
    if (component.isDescendantOf(this.container) && Ext.Array.contains(this.container.query(this.selector), component)) {
      return true;
    }
    return false;
  }
});
