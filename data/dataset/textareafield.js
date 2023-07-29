/**
 * PhotonUI - Javascript Web User Interface.
 *
 * @module PhotonUI
 * @submodule Input
 * @namespace photonui
 */

var Field = require("./field.js");

/**
 * Multiline text field.
 *
 * @class TextAreaField
 * @constructor
 * @extends photonui.Field
 */
var TextAreaField = Field.$extend({

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
     * Number of columns.
     *
     * @property cols
     * @type Number
     * @default 20
     */
    getCols: function() {
        return parseInt(this.__html.field.cols);
    },

    setCols: function(cols) {
        this.__html.field.cols = cols;
    },

    /**
     * Number of rows.
     *
     * @property rows
     * @type Number
     * @default 3
     */
    getRows: function() {
        return parseInt(this.__html.field.rows);
    },

    setRows: function(rows) {
        this.__html.field.rows = rows;
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
        this.__html.field = document.createElement("textarea");
        this.__html.field.className = "photonui-widget photonui-field photonui-field-textarea";
        this.__html.field.cols = 20;
        this.__html.field.rows = 3;
    }
});

module.exports = TextAreaField;
