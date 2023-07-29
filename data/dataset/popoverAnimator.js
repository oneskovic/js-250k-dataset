(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('PopoverAnimator', function() {
    var PopoverAnimator = Class.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2,
      delay: 0,

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

      show: function(popover, callback) {
        callback();
      },

      hide: function(popover, callback) {
        callback();
      }
    });

    return PopoverAnimator;
  });
})();
