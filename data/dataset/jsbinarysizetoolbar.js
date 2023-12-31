/**
 * @fileoverview Sample code to render a simple goog.ui.Toolbar.  The
 * size of the resulting jsbinary for this sample file is tracked using
 * Greenspan (http://go/greenspan).
 *
*
 */

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Option');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarSelect');
goog.require('goog.ui.ToolbarSeparator');

function drawToolbar() {
  function logEvent(e) {
  }

  var EVENTS = goog.object.getValues(goog.ui.Component.EventType);

  // Create the toolbar
  var t1 = new goog.ui.Toolbar();

  // Add a button
  t1.addChild(new goog.ui.ToolbarButton('Button'), true);
  t1.getChildAt(0).setTooltip('This is a tooltip for a button');

  // Add a separator
  t1.addChild(new goog.ui.ToolbarSeparator(), true);

  // Create the select menu
  var s1 = new goog.ui.ToolbarSelect('Select font');
  goog.array.forEach(['Normal', 'Times', 'Courier New', 'Georgia', 'Trebuchet',
    'Verdana'],
      function(label) {
        var item = new goog.ui.Option(label);
        s1.addItem(item);
      });
  s1.setTooltip('Font');

  t1.addChild(s1, true);
  goog.events.listen(t1, EVENTS, logEvent);
  t1.render(goog.dom.getElement('toolbar'));
}

goog.exportSymbol('drawToolbar', drawToolbar);
