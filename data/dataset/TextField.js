/**
 * PhotonUI - Javascript Web User Interface.
 *
 * @module PhotonUI
 * @submodule Input
 * @namespace photonui
 */

var Field = require("./field.js");

/**
 * Text, Password, Email, Search, Tel, URL Fields.
 *
 * @class TextField
 * @constructor
 * @extends photonui.Field
 */
var TextField = Field.$extend({

    // Constructor
    __init__: function(params) {
        this.$super(params);
        this._bindFieldEvents();
    },


    //////////////////////////////////////////
    // Properties and Accessors             //
    //////////////////////////////////////////


    // ====== Public properties ======


    /**
     * Type of the field.
     *
     *   * text
     *   * password
     *   * email
     *   * search
     *   * tel
     *   * url
     *
     * @property type
     * @type String
     * @default text
     */
    getType: function() {
        return this.__html.field.type;
    },

    setType: function(type) {
        if (type != "text" && type != "password" && type != "email" && type != "search" && type != "tel" && type != "url") {
            throw 'Error: The type should be "text", "password", "email", "search", "tel" or "url".';
            return;
        }
        this.__html.field.type = type;
    },


    //////////////////////////////////////////
    // Methods                              //
    //////////////////////////////////////////


    // ====== Private methods ======


    /**
     * Build the widget HTML.
     *
     * @method _buildHtml
     * @private
     */
    _buildHtml: function() {
        this.__html.field = document.createElement("input");
        this.__html.field.className = "photonui-widget photonui-field photonui-field-text";
        this.__html.field.type = "text";
    }
});

module.exports = TextField;
