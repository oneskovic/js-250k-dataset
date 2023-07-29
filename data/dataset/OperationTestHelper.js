/*global ops, runtime, odf, Node, NodeFilter*/

/**
 * @constructor
 */
ops.OperationTestHelper = function OperationTestHelper() {
    "use strict";

    var odfUtils = odf.OdfUtils;

    /**
     * Returns true for any node not contained in an ODF paragraph
     * @param {!Node} node
     * @returns {!number}
     */
    function insignificantNodes(node) {
        var textNode = /**@type{!Text}*/(node);
        if (odfUtils.isODFWhitespace(textNode.data) && !odfUtils.isGroupingElement(textNode.parentNode) && !odfUtils.isCharacterElement(textNode.parentNode)) {
            return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_REJECT;
    }

    /**
     * Removes any text nodes not contained in a paragraph element.
     * This is done to allow us to ignore whitespace nodes when comparing before/after node structures in a test.
     * @param {!Node} rootElement
     * @return {undefined}
     */
    this.removeInsignificantTextNodes = function (rootElement) {
        var walker = rootElement.ownerDocument.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, insignificantNodes, false),
            node = walker.nextNode(),
            nodesToRemove = [];
        while (node) {
            nodesToRemove.push(node);
            node = walker.nextNode();
        }

        nodesToRemove.forEach(function (nodeToRemove) {
            nodeToRemove.parentNode.removeChild(nodeToRemove);
        });
    };
};
