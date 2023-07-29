/*global gui, odf*/

/**
 * Show ODF fields in an ODT document.
 *
 * @constructor
 * @implements {core.Destroyable}
 * @param {!odf.OdfCanvas} odfCanvas
 */
gui.OdfFieldView = function(odfCanvas) {
    "use strict";
    var /**@type{!HTMLStyleElement}*/
        style,
        document = odfCanvas.getElement().ownerDocument;

    /**
     * @return {!HTMLStyleElement}
     */
    function newStyleSheet() {
        var head = document.getElementsByTagName('head').item(0),
            sheet = /**@type{!HTMLStyleElement}*/(document.createElement('style')),
            /**@type{!string}*/
            text = "";

        sheet.type = 'text/css';
        sheet.media = 'screen, print, handheld, projection';
        odf.Namespaces.forEachPrefix(function(prefix, ns) {
            text += "@namespace " + prefix + " url(" + ns + ");\n";
        });
        sheet.appendChild(document.createTextNode(text));
        head.appendChild(sheet);
        return sheet;
    }

    /**
     * @param {!HTMLStyleElement} style
     * @return {undefined}
     */
    function clearCSSStyleSheet(style) {
        var stylesheet = /**@type{!CSSStyleSheet}*/(style.sheet),
            cssRules = stylesheet.cssRules;

        while (cssRules.length) {
            stylesheet.deleteRule(cssRules.length - 1);
        }
    }

    /**
     * @param {!Array.<!string>} selectors
     * @param {!string} css
     * @return {!string}
     */
    function createRule(selectors, css) {
        return selectors.join(",\n") + "\n" + css + "\n";
    }

    /**
     * Applies a grey background to all ODF field containers as defined in the container definitions within
     * this class.
     *
     * @return {!string}
     */
    function generateFieldCSS() {
        var /**@type{!Array.<!string>}*/
            cssSelectors = odf.OdfSchema.getFields().map(function(prefixedName) { return prefixedName.replace(":", "|"); }),
            highlightFields = createRule(cssSelectors, "{ background-color: #D0D0D0; }"),
            emptyCssSelectors = cssSelectors.map(function(selector) { return selector + ":empty::after"; }),
            // Ensure fields are always visible even if they contain no content
            highlightEmptyFields = createRule(emptyCssSelectors, "{ content:' '; white-space: pre; }");

        return highlightFields + "\n" + highlightEmptyFields;
    }

    /**
     * @return {undefined}
     */
    this.showFieldHighlight = function() {
        style.appendChild(document.createTextNode(generateFieldCSS()));
    };

    /**
     * @return {undefined}
     */
    this.hideFieldHighlight = function() {
        clearCSSStyleSheet(style);
    };

    /**
     * Destroy the object.
     * Do not access any member of this object after this call.
     * @param {function(!Error=):undefined} callback
     * @return {undefined}
     */
    this.destroy = function(callback) {
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
        callback();
    };

    function init() {
        style = newStyleSheet();
    }
    init();
};