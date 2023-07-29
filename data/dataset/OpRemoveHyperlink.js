/*global ops, odf, core, runtime */

/**
 * @constructor
 * @implements ops.Operation
 */
ops.OpRemoveHyperlink = function OpRemoveHyperlink() {
    "use strict";

    var memberid, timestamp, position, length,
        domUtils = core.DomUtils,
        odfUtils = odf.OdfUtils;

    /**
     * @param {!ops.OpRemoveHyperlink.InitSpec} data
     */
    this.init = function (data) {
        memberid = data.memberid;
        timestamp = data.timestamp;
        position = data.position;
        length = data.length;
    };

    this.isEdit = true;
    this.group = undefined;

    /**
     * @param {!ops.Document} document
     */
    this.execute = function (document) {
        var odtDocument = /**@type{ops.OdtDocument}*/(document),
            range = odtDocument.convertCursorToDomRange(position, length),
            links = odfUtils.getHyperlinkElements(range),
            node;

        runtime.assert(links.length === 1, "The given range should only contain a single link.");
        node = domUtils.mergeIntoParent(/**@type{!Node}*/(links[0]));
        range.detach();

        odtDocument.fixCursorPositions();
        odtDocument.getOdfCanvas().refreshSize();
        odtDocument.getOdfCanvas().rerenderAnnotations();
        odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {
            paragraphElement: odfUtils.getParagraphElement(node),
            memberId: memberid,
            timeStamp: timestamp
        });
        return true;
    };

    /**
     * @return {!ops.OpRemoveHyperlink.Spec}
     */
    this.spec = function () {
        return {
            optype: "RemoveHyperlink",
            memberid: memberid,
            timestamp: timestamp,
            position: position,
            length: length
        };
    };
};
/**@typedef{{
    optype:string,
    memberid:string,
    timestamp:number,
    position:number,
    length:number
}}*/
ops.OpRemoveHyperlink.Spec;
/**@typedef{{
    memberid:string,
    timestamp:(number|undefined),
    position:number,
    length:number
}}*/
ops.OpRemoveHyperlink.InitSpec;
