/**
 * @fileoverview A simple plugin that inserts 'Hello World!' on command. This
 * plugin is intended to be an example of a very simple plugin for plugin
 * developers.
 *
*
 * @see helloworld.html
 */

goog.provide('goog.demos.editor.HelloWorld');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.editor.Plugin');



/**
 * Plugin to insert 'Hello World!' into an editable field.
 * @constructor
 * @extends {goog.editor.Plugin}
 */
goog.demos.editor.HelloWorld = function() {
  goog.editor.Plugin.call(this);
};
goog.inherits(goog.demos.editor.HelloWorld, goog.editor.Plugin);


/** @inheritDoc */
goog.demos.editor.HelloWorld.prototype.getTrogClassId = function() {
  return 'HelloWorld';
};


/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
goog.demos.editor.HelloWorld.COMMAND = {
  HELLO_WORLD: '+helloWorld'
};


/** @inheritDoc */
goog.demos.editor.HelloWorld.prototype.isSupportedCommand = function(
    command) {
  return command == goog.demos.editor.HelloWorld.COMMAND.HELLO_WORLD;
};


/**
 * Executes a command. Does not fire any BEFORECHANGE, CHANGE, or
 * SELECTIONCHANGE events (these are handled by the super class implementation
 * of {@code execCommand}.
 * @param {string} command Command to execute.
 * @override
 * @protected
 */
goog.demos.editor.HelloWorld.prototype.execCommandInternal = function(
    command) {
  var domHelper = this.fieldObject.getEditableDomHelper();
  var range = this.fieldObject.getRange();
  range.removeContents();
  var newNode =
      domHelper.createDom(goog.dom.TagName.SPAN, null, 'Hello World!');
  range.insertNode(newNode, false);
};
