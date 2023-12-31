/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
* Event bus for live component selectors.
*/

Ext.define('Deft.event.LiveEventBus', {
  alternateClassName: ['Deft.LiveEventBus'],
  requires: ['Ext.Component', 'Ext.ComponentManager', 'Deft.event.LiveEventListener'],
  singleton: true,
  constructor: function() {
    this.listeners = [];
  },
  destroy: function() {
    var listener, _i, _len, _ref;
    _ref = this.listeners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener.destroy();
    }
    this.listeners = null;
  },
  addListener: function(container, selector, eventName, fn, scope, options) {
    var listener;
    listener = Ext.create('Deft.event.LiveEventListener', {
      container: container,
      selector: selector,
      eventName: eventName,
      fn: fn,
      scope: scope,
      options: options
    });
    this.listeners.push(listener);
  },
  removeListener: function(container, selector, eventName, fn, scope) {
    var listener;
    listener = this.findListener(container, selector, eventName, fn, scope);
    if (listener != null) {
      Ext.Array.remove(this.listeners, listener);
      listener.destroy();
    }
  },
  on: function(container, selector, eventName, fn, scope, options) {
    return this.addListener(container, selector, eventName, fn, scope, options);
  },
  un: function(container, selector, eventName, fn, scope) {
    return this.removeListener(container, selector, eventName, fn, scope);
  },
  findListener: function(container, selector, eventName, fn, scope) {
    var listener, _i, _len, _ref;
    _ref = this.listeners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      if (listener.container === container && listener.selector === selector && listener.eventName === eventName && listener.fn === fn && listener.scope === scope) {
        return listener;
      }
    }
    return null;
  },
  register: function(component) {
    component.on('added', this.onComponentAdded, this);
    component.on('removed', this.onComponentRemoved, this);
  },
  unregister: function(component) {
    component.un('added', this.onComponentAdded, this);
    component.un('removed', this.onComponentRemoved, this);
  },
  onComponentAdded: function(component, container, eOpts) {
    var listener, _i, _len, _ref;
    _ref = this.listeners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener.register(component);
    }
  },
  onComponentRemoved: function(component, container, eOpts) {
    var listener, _i, _len, _ref;
    _ref = this.listeners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener.unregister(component);
    }
  }
}, function() {
  if (Ext.getVersion('touch') != null) {
    Ext.define('Deft.Component', {
      override: 'Ext.Component',
      setParent: function(newParent) {
        var oldParent, result;
        oldParent = this.getParent();
        result = this.callParent(arguments);
        if (oldParent === null && newParent !== null) {
          this.fireEvent('added', this, newParent);
        } else if (oldParent !== null && newParent !== null) {
          this.fireEvent('removed', this, oldParent);
          this.fireEvent('added', this, newParent);
        } else if (oldParent !== null && newParent === null) {
          this.fireEvent('removed', this, oldParent);
        }
        return result;
      },
      isDescendantOf: function(container) {
        var ancestor;
        ancestor = this.getParent();
        while (ancestor != null) {
          if (ancestor === container) {
            return true;
          }
          ancestor = ancestor.getParent();
        }
        return false;
      }
    });
  }
  Ext.Function.interceptAfter(Ext.ComponentManager, 'register', function(component) {
    Deft.event.LiveEventBus.register(component);
  });
  Ext.Function.interceptAfter(Ext.ComponentManager, 'unregister', function(component) {
    Deft.event.LiveEventBus.unregister(component);
  });
});
