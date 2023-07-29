/**
 * @fileoverview Code for test clients to easily create HitEvents for testing.
 *
 * @author kenobi@google.com (Ben Kwa)
 */

goog.provide('analytics.testing.Hits');

goog.require('analytics.ParameterMap');
goog.require('analytics.testing.TestHit');


/**
 * Returns a Hit representing an appView.
 * @param {string} description
 * @return {!analytics.Tracker.Hit}
 */
analytics.testing.Hits.createAppViewHit = function(description) {
  return new analytics.testing.TestHit(
      analytics.HitTypes.APPVIEW,
      new analytics.ParameterMap(
          analytics.Parameters.DESCRIPTION, description));
};


/**
 * Returns a Hit representing an event.
 * @param {!analytics.Value} val The event value.
 * @return {!analytics.Tracker.Hit}
 */
analytics.testing.Hits.createEventHit = function(val) {
  return new analytics.testing.TestHit(
      analytics.HitTypes.EVENT,
      new analytics.ParameterMap(
          analytics.Parameters.EVENT_VALUE, val));
};
