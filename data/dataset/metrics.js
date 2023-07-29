'use strict';


define(function(require) {
  var evt = require('evt'),
      apiDone = false,
      contentDone = false;

  function checkAppLoaded() {
    if (apiDone && contentDone) {
      window.performance.mark('fullyLoaded');
      window.dispatchEvent(new CustomEvent('moz-app-loaded'));
    }
  }

  // Event listeners. Note they all unsubscribe after the first reception of
  // that kind of event. This is because cards, who can have multiple instances,
  // can emit the events throughout the lifetime of the app, and for the
  // purposes of the startup events, they only need to be done once on startup.
  evt.once('metrics:apiDone', function onApiDone() {
    apiDone = true;
    checkAppLoaded();
  });

  evt.once('metrics:contentDone', function() {
    contentDone = true;

    // Only need to dispatch these events if the startup cache was not used.
    if (!window.startupCacheEventsSent) {
      // Now that content is in, it is visually complete, and content is
      // interactive, since event listeners are bound as part of content
      // insertion.
      window.performance.mark('visuallyLoaded');
      window.dispatchEvent(new CustomEvent('moz-app-visually-complete'));
      window.performance.mark('contentInteractive');
      window.dispatchEvent(new CustomEvent('moz-content-interactive'));
    }

    checkAppLoaded();
  });
});
