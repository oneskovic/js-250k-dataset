(function(GUIElement) {
  'use strict';

  /**
   * Label
   *
   * @param String    name    Name of GUIElement (unique)
   * @param Object    opts    A list of options
   *
   * @option  opts  String    label       The Label of Element
   * @option  opts  String    forInput    ID/Name of input element (optional HTML feature)
   *
   * @api OSjs.GUI.Label
   *
   * @extends GUIElement
   * @class
   */
  var Label = function(name, opts) {
    opts            = opts || {};
    opts.focusable  = false;
    opts.label      = opts.label || opts.value || '';

    GUIElement.apply(this, [name, opts]);
  };

  Label.prototype = Object.create(GUIElement.prototype);

  Label.prototype.init = function() {
    var el = GUIElement.prototype.init.apply(this, ['GUILabel', 'label']);
    el.appendChild(document.createTextNode(this.opts.label));
    if ( this.opts.forInput ) {
      el.setAttribute('for', this.opts.forInput);
    }
    return el;
  };

  /**
   * Set the label value
   *
   * @param   String    l       The value
   *
   * @return  void
   *
   * @method  Label::setLabel()
   */
  Label.prototype.setLabel = function(l) {
    this.opts.label = l;
    this.$element.innerHTML = '';
    this.$element.appendChild(document.createTextNode(this.opts.label));
  };

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.GUI.Label        = Label;

})(OSjs.Core.GUIElement);
