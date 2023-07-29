(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('NavigatorTransitionAnimator', function() {
    var NavigatorTransitionAnimator = Class.extend({

      /**
       * @param {Object} options
       * @param {String} options.timing
       * @param {Number} options.duration
       * @param {Number} options.delay
       */
      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
        this.delay = options.delay !== undefined ? options.delay : this.delay;
      },

      push: function(enterPage, leavePage, callback) {
        callback();
      },

      pop: function(enterPage, leavePage, callback) {
        callback();
      }
    });

    return NavigatorTransitionAnimator;
  });
})();
