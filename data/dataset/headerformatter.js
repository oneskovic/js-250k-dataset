/**
 * @fileoverview Handles applying header styles to text.
 *
*
 */

goog.provide('goog.editor.plugins.HeaderFormatter');

goog.require('goog.editor.Command');
goog.require('goog.editor.Plugin');
goog.require('goog.userAgent');


/**
 * Applies header styles to text.
 * @constructor
 * @extends {goog.editor.Plugin}
 */
goog.editor.plugins.HeaderFormatter = function() {
  goog.editor.Plugin.call(this);
};
goog.inherits(goog.editor.plugins.HeaderFormatter, goog.editor.Plugin);


/** @inheritDoc */
goog.editor.plugins.HeaderFormatter.prototype.getTrogClassId = function() {
  return 'HeaderFormatter';
};

// TODO(user):  Move execCommand functionality from basictextformatter into
// here for headers.  I'm not doing this now because it depends on the
// switch statements in basictextformatter and we'll need to abstract that out
// in order to seperate out any of the functions from basictextformatter.

/**
 * Commands that can be passed as the optional argument to execCommand.
 * @enum {string}
 */
goog.editor.plugins.HeaderFormatter.HEADER_COMMAND = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4'
};


/**
 * @inheritDoc
 */
goog.editor.plugins.HeaderFormatter.prototype.handleKeyboardShortcut = function(
    e, key, isModifierPressed) {
  if (!isModifierPressed) {
    return false;
  }
  var command = null;
  switch (key) {
    case '1':
      command = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H1;
      break;
    case '2':
      command = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H2;
      break;
    case '3':
      command = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H3;
      break;
    case '4':
      command = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H4;
      break;
  }
  if (command) {
    this.fieldObject.execCommand(
        goog.editor.Command.FORMAT_BLOCK, command);
    // Prevent default isn't enough to cancel tab navigation in FF.
    if (goog.userAgent.GECKO) {
      e.stopPropagation();
    }
    return true;
  }
  return false;
};
