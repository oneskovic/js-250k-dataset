/*global gui, NodeFilter, odf, Node*/

/**
 * Exclude nodes that do not make up part of the ODF's text body. This includes:
 * - Any text node that is not within a text grouping element
 * - Any node within a text:tracked-changes block
 *
 * @constructor
 * @extends NodeFilter
 */
gui.OdfTextBodyNodeFilter = function () {
    "use strict";
    var odfUtils = odf.OdfUtils,
        TEXT_NODE = Node.TEXT_NODE,
        FILTER_REJECT = NodeFilter.FILTER_REJECT,
        FILTER_ACCEPT = NodeFilter.FILTER_ACCEPT,
        textns = odf.Namespaces.textns;

    /**
     * @param {!Node} node
     * @return {!number}
     */
    this.acceptNode = function (node) {
        if (node.nodeType === TEXT_NODE) {
            if (!odfUtils.isGroupingElement(node.parentNode)) {
                return FILTER_REJECT;
            }
        } else if (node.namespaceURI === textns && node.localName === "tracked-changes") {
            return FILTER_REJECT;
        }
        return FILTER_ACCEPT;
    };
};