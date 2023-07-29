/*global ops, runtime, gui, odf, Node, core*/

/**
 * @constructor
 * @implements ops.Operation
 */
ops.OpApplyDirectStyling = function OpApplyDirectStyling() {
    "use strict";

    var memberid, timestamp,
        /**@type {number}*/
        position,
        /**@type {number}*/
        length,
        /**@type{!odf.Formatting.StyleData}*/
        setProperties,
        odfUtils = odf.OdfUtils,
        domUtils = core.DomUtils;

    /**
     * @param {!ops.OpApplyDirectStyling.InitSpec} data
     */
    this.init = function (data) {
        memberid = data.memberid;
        timestamp = data.timestamp;
        position = parseInt(data.position, 10);
        length = parseInt(data.length, 10);
        setProperties = data.setProperties;
    };

    this.isEdit = true;
    this.group = undefined;

    /**
     * Apply the specified style properties to all elements within the given range.
     * Currently, only text styles are applied.
     * @param {!ops.OdtDocument} odtDocument
     * @param {!Range} range Range to apply text style to
     * @param {!Object} info Style information. Only data within "style:text-properties" will be considered and applied
     */
    function applyStyle(odtDocument, range, info) {
        var odfCanvas = odtDocument.getOdfCanvas(),
            odfContainer = odfCanvas.odfContainer(),
            nextTextNodes = domUtils.splitBoundaries(range),
            textNodes = odfUtils.getTextNodes(range, false),
            textStyles;

        textStyles = new odf.TextStyleApplicator(
            new odf.ObjectNameGenerator(/**@type{!odf.OdfContainer}*/(odfContainer), memberid), // TODO: use the instance in SessionController
            odtDocument.getFormatting(),
            odfContainer.rootElement.automaticStyles
        );
        textStyles.applyStyle(textNodes, range, info);
        nextTextNodes.forEach(domUtils.normalizeTextNodes);
    }

    /**
     * @param {!ops.Document} document
     */
    this.execute = function (document) {
        var odtDocument = /**@type{ops.OdtDocument}*/(document),
            range = odtDocument.convertCursorToDomRange(position, length),
            impactedParagraphs = odfUtils.getParagraphElements(range);

        applyStyle(odtDocument, range, setProperties);

        range.detach();
        odtDocument.getOdfCanvas().refreshCSS();
        odtDocument.fixCursorPositions(); // The container splits may leave the cursor in an invalid spot

        impactedParagraphs.forEach(function (n) {
            odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {
                paragraphElement: n,
                memberId: memberid,
                timeStamp: timestamp
            });
        });

        odtDocument.getOdfCanvas().rerenderAnnotations();
        return true;
    };

    /**
     * @return {!ops.OpApplyDirectStyling.Spec}
     */
    this.spec = function () {
        return {
            optype: "ApplyDirectStyling",
            memberid: memberid,
            timestamp: timestamp,
            position: position,
            length: length,
            setProperties: setProperties
        };
    };
};
/**@typedef{{
    optype:string,
    memberid:string,
    timestamp:number,
    position:number,
    length:number,
    setProperties:!odf.Formatting.StyleData
}}*/
ops.OpApplyDirectStyling.Spec;
/**@typedef{{
    memberid:string,
    timestamp:(number|undefined),
    position:number,
    length:number,
    setProperties:!odf.Formatting.StyleData
}}*/
ops.OpApplyDirectStyling.InitSpec;
