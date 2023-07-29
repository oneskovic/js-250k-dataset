/*global runtime, odf*/

/**
 * @constructor
 * @param {!Element} element
 * @param {!odf.StyleParseUtils} styleParseUtils
 * @param {!odf.TextProperties|undefined} parent
 */
odf.TextProperties = function (element, styleParseUtils, parent) {
    "use strict";
    var self = this,
        fons = odf.Namespaces.fons,
        getter;
    getter = {
        fontSize: function () {
            var a = element.getAttributeNS(fons, "font-size"),
                value = styleParseUtils.parsePositiveLengthOrPercent(a,
                    "fontSize", parent && parent.data);
            return value;
        }
    };
    /**
     * @return {!number|undefined}
     */
    this.fontSize = function () {
        return /**@type{!number|undefined}*/(self.data.value("fontSize"));
    };
    /**
     * @type {!odf.LazyStyleProperties|undefined}
     */
    this.data;
    function init() {
        var p = parent === undefined ? undefined : parent.data;
        self.data = new odf.LazyStyleProperties(p, getter);
    }
    init();
};
/**
 * @constructor
 */
odf.ComputedTextProperties = function () {
    "use strict";
    var /**@type{!Object.<!string,*>}*/
        data = {},
        /**@type{!Array.<!odf.TextProperties>}*/
        styleChain = [];
    /**
     * @param {!string} name
     * @return {*}
     */
    function value(name) {
        var v, i;
        if (data.hasOwnProperty(name)) {
            v = data[name];
        } else {
            for (i = 0; v === undefined && i < styleChain.length; i += 1) {
                v = /**@type{!function():*}*/(styleChain[i][name])();
            }
            data[name] = v;
        }
        return v;
    }
    /**
     * @param {!Array.<!odf.TextProperties>} newStyleChain
     * @return {undefined}
     */
    this.setStyleChain = function setStyleChain(newStyleChain) {
        styleChain = newStyleChain;
        data = {};
    };
    /**
     * @return {!number}
     */
    this.fontSize = function () {
        return /**@type{!number}*/(value("fontSize")) || 12;
    };
};
