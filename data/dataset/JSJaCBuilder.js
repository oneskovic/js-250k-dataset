/*exported JSJaCBuilder */

/**
 * This code is taken from 
 * {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} 
 * and has been modified to suit our
 * needs.<br/>
 * The original parts of the code do have the following
 * copyright and license notice:<br/>
 * Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us,
 * http://mir.acu lo.us) <br/>
 * script.aculo.us is freely distributable under the terms of an
 * MIT-style license.<br>
 * For details, see the script.aculo.us web site at
 * {@link http://script.aculo.us/}
 * @namespace
 */
var JSJaCBuilder = {

    /**
     * build a new node within an xml document
     * @param {XMLDocument} doc an xml document to build the new nodes for
     * @param {string} elementName the name of the element to be created
     */
  buildNode: function(doc, elementName) {

    var element, ns = arguments[4];

    // attributes (or text)
    if(arguments[2])
      if(JSJaCBuilder._isStringOrNumber(arguments[2]) ||
         (arguments[2] instanceof Array)) {
        element = this._createElement(doc, elementName, ns);
        JSJaCBuilder._children(doc, element, arguments[2]);
      } else {
        ns = arguments[2]['xmlns'] || ns;
        element = this._createElement(doc, elementName, ns);
        for(var attr in arguments[2]) {
          if (arguments[2].hasOwnProperty(attr) && attr != 'xmlns')
            element.setAttribute(attr, arguments[2][attr]);
        }
      }
    else
      element = this._createElement(doc, elementName, ns);
    // text, or array of children
    if(arguments[3])
      JSJaCBuilder._children(doc, element, arguments[3], ns);

    return element;
  },

  /**
   * @private
   */
  _createElement: function(doc, elementName, ns) {
    try {
      if (ns)
        return doc.createElementNS(ns, elementName);
    } catch (ex) { }

    var el = doc.createElement(elementName);

    if (ns)
      el.setAttribute("xmlns", ns);

    return el;
  },

  /**
   * @private
   */
  _text: function(doc, text) {
    return doc.createTextNode(text);
  },

  /**
   * @private
   */
  _children: function(doc, element, children, ns) {
    if(typeof children=='object') { // array can hold nodes and text
      for (var i in children) {
        if (children.hasOwnProperty(i)) {
          var e = children[i];
          if (typeof e=='object') {
            if (e instanceof Array) {
              var node = JSJaCBuilder.buildNode(doc, e[0], e[1], e[2], ns);
              element.appendChild(node);
            } else {
              element.appendChild(e);
            }
          } else {
            if(JSJaCBuilder._isStringOrNumber(e)) {
              element.appendChild(JSJaCBuilder._text(doc, e));
            }
          }
        }
      }
    } else {
      if(JSJaCBuilder._isStringOrNumber(children)) {
        element.appendChild(JSJaCBuilder._text(doc, children));
      }
    }
  },

  /**
   * @private
   */
  _attributes: function(attributes) {
    var attrs = [];
    for(var attribute in attributes)
      if (attributes.hasOwnProperty(attribute))
        attrs.push(attribute +
          '="' + attributes[attribute].toString().htmlEnc() + '"');
    return attrs.join(" ");
  },

  /**
   * @private
   */
  _isStringOrNumber: function(param) {
    return(typeof param=='string' || typeof param=='number');
  }
};
