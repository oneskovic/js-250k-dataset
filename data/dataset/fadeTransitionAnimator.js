(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('FadeTransitionAnimator', function(NavigatorTransitionAnimator) {

    /**
     * Fade-in screen transition.
     */
    var FadeTransitionAnimator = NavigatorTransitionAnimator.extend({

      duration: 0.4,
      timing: 'linear',
      delay: 0,

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {

        animit.runAll(

          animit([enterPage.getPageView().getContentElement(), enterPage.getPageView().getBackgroundElement()])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .wait(this.delay)
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            }),

          animit(enterPage.getPageView().getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .wait(this.delay)
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
        );

      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, callback) {
        animit.runAll(

          animit([leavePage.getPageView().getContentElement(), leavePage.getPageView().getBackgroundElement()])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .wait(this.delay)
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: this.duration,
              timing: this.timing
            })
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePage.getPageView().getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .wait(this.delay)
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: this.duration,
              timing: this.timing
            })

        );
      }
    });

    return FadeTransitionAnimator;
  });

})();
