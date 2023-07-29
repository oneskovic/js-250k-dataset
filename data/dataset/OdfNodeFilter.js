/*global Node, NodeFilter, odf*/

/**
 * Class that filters runtime specific nodes from the DOM.
 * @constructor
 * @implements {xmldom.LSSerializerFilter}
 */
odf.OdfNodeFilter = function OdfNodeFilter() {
    "use strict";

    /**
     * @param {!Node} node
     * @return {!number}
     */
    this.acceptNode = function (node) {
        var result;
        if (node.namespaceURI === "http://www.w3.org/1999/xhtml") {
            result = NodeFilter.FILTER_SKIP;
        } else if (node.namespaceURI && node.namespaceURI.match(/^urn:webodf:/)) {
            // skip all webodf nodes incl. child nodes
            result = NodeFilter.FILTER_REJECT;
        } else {
            result = NodeFilter.FILTER_ACCEPT;
        }
        return result;
    };
};
