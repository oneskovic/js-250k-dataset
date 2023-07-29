'use strict';

define(function(require, exports, module) {

  var mvelo = require('../lib-mvelo').mvelo;
  var l10n = mvelo.l10n.get;

  var log = [];
  var logTimer = 0;

  function push(source, type) {
    var entry = {
      source: source,
      sourcei18n: l10n(source),
      type: type,
      typei18n: l10n(type),
      timestamp: new Date().toISOString()
    };
    var lastEntry = log[log.length - 1];
    if (lastEntry &&
        source === lastEntry.source &&
        type === lastEntry.type &&
        type === 'security_log_textarea_input') {
      // aggregate text input events
      log[log.length - 1] = entry;
    } else {
      log.push(entry);
    }
    if (logTimer) {
      mvelo.util.clearTimeout(logTimer);
    } else {
      setBadge();
    }
    logTimer = mvelo.util.setTimeout(clearBadge, 2000);
  }

  function setBadge() {
    mvelo.browserAction.state({
      badge: 'Ok',
      badgeColor: '#29A000'
    });
  }

  function clearBadge() {
    logTimer = 0;
    mvelo.browserAction.state({
      badge: ''
    });
  }

  function getAll() {
    return log;
  }

  function getLatest(size) {
    log.slice(-size);
  }

  exports.push = push;
  exports.getAll = getAll;
  exports.getLatest = getLatest;

});
