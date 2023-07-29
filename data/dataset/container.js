/**
 * PhotonUI - Javascript Web User Interface.
 *
 * @module PhotonUI
 * @submodule Container
 * @namespace photonui
 */

var Widget = require("../widget.js");

/**
 * Base class for container widgets.
 *
 * @class Container
 * @constructor
 * @extends photonui.Widget
 */
Container = Widget.$extend({

    //////////////////////////////////////////
    // Properties and Accessors             //
    //////////////////////////////////////////


    // ====== Public properties ======


    /**
     * The child widget name.
     *
     * @property childName
     * @type String
     * @default null (no child)
     */
    _childName: null,

    getChildName: function() {
        return this._childName;
    },

    setChildName: function(childName) {
        if (this.childName && this.containerNode && this.child && this.child.html) {
            this.containerNode.removeChild(this.child.html);
        }
        this._childName = childName;
        if (this.childName && this.containerNode && this.child && this.child.html) {
            this.containerNode.appendChild(this.child.html);
        }
    },

    /**
     * The child widget.
     *
     * @property child
     * @type photonui.Widget
     * @default null (no child)
     */
    getChild: function() {
        return Widget.getWidget(this.childName);
    },

    setChild: function(child) {
        if (!child instanceof Widget) {
            this.childName = null;
            return;
        }
        this.childName = child.name;
    },

    /**
     * HTML Element that contain the child widget HTML.
     *
     * @property containerNode
     * @type HTMLElement
     * @readOnly
     */
    getContainerNode: function() {
        console.warn("getContainerNode() method not implemented for this widget.");
        return null;
    },


    //////////////////////////////////////////
    // Methods                              //
    //////////////////////////////////////////


    // ====== Public methods ======


    /**
     * Destroy the widget.
     *
     * @method destroy
     */
    destroy: function() {
        if (this.childName) {
            this.child.destroy();
        }
        this.$super();
    }
});

module.exports = Container;
