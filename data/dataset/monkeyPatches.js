var Observable = require("../../uki-core/observable").Observable,
    evt = require("../../uki-core/event"),
    utils = require("../../uki-core/utils"),
    ErrorReport = require("../../lib/errorReport"),
    env = require("../../uki-core/env"),
    Async = require("../../lib/async"),
    expando = env.expando;

/**
 * monkey-patch - add logging to Observable.trigger
 */
Observable.trigger = function(e) {
  var type = e.type,
    listeners = this._listeners;
  var wrapped = evt.createEvent(e, {});
  if (listeners && listeners[type]) {
    utils.forEach(listeners[type], function(callback) {
      // add try/catch here, and call to handleException
      try {
        callback.call(this, wrapped);
      } catch (ex) {
        ErrorReport.handleException(
          ex, 'pe:observable:trigger');
      }
    }, this);
  }
  return this;
};

evt.trigger = function(el, e) {
  var listenerForEl = evt.listeners[el[expando]] || {},
    listenersForType = listenerForEl[e.type];

  if (!e.target) { e.target = el; }

  listenersForType && utils.forEach(listenersForType, function(l) {
    // add try/catch here, and call to handleException
    try {
      l.call(el, e);
    } catch (ex) {
      ErrorReport.handleException(ex, 'pe:event:trigger');
    }
  });

  if (e.simulatePropagation && !e.isPropagationStopped() &&
      el.parentNode) {
    evt.trigger(el.parentNode, e);
  }
};

Async.forEach =
  function(items, origIteratorCallback, callback, context) {
  var i = -1;

  var iteratorCallback = function(item, j, iterator) {
    try {
      origIteratorCallback.call(context || null, item, j, iterator);
    } catch (e) {
      ErrorReport.handleException(e, 'pe:async:foreach');
    }
  };

  function iterator() {
    if (++i < items.length) {
      if (i && i % 30 === 0) {
        // limit stack depth
        setTimeout(function() {
          iteratorCallback.call(context || null, items[i], i, iterator);
        }, 1);
      } else {
        iteratorCallback.call(context || null, items[i], i, iterator);
      }
    } else {
      if (i === items.length) {
        callback.call(context || null);
      }
      if (__DEV__) {
        if (i > items.length) {
          throw new Error('Trying to call iteratorCallback too many times');
        }
      }
    }
  }
  iterator();
};


exports.run = function() {};
