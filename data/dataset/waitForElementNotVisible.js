var util = require('util');
var WaitForElementPresent = require('./waitForElementPresent.js');


function WaitForElementNotVisible() {
  WaitForElementPresent.call(this);
  this.expectedValue = 'not visible';
}

util.inherits(WaitForElementNotVisible, WaitForElementPresent);

WaitForElementNotVisible.prototype.elementFound = function() {
  return this.isVisible();
};

WaitForElementNotVisible.prototype.elementVisible = function(result, now) {
  if (now - this.startTimer < this.ms) {
    // element wasn't visible, schedule another check
    this.reschedule('isVisible');
    return this;
  }

  var defaultMsg = 'Timed out while waiting for element <%s> to not be visible for %d milliseconds.';
  return this.fail(result, 'visible', this.expectedValue, defaultMsg);
};

WaitForElementNotVisible.prototype.elementNotVisible = function(result, now) {
  var defaultMsg = 'Element <%s> was not visible after %d milliseconds.';
  return this.pass(result, defaultMsg, now - this.startTimer);
};

module.exports = WaitForElementNotVisible;
