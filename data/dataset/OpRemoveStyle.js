/*global ops*/

/**
 * @constructor
 * @implements ops.Operation
 */
ops.OpRemoveStyle = function OpRemoveStyle() {
    "use strict";

    var memberid, timestamp, styleName, styleFamily;

    /**
     * @param {!ops.OpRemoveStyle.InitSpec} data
     */
    this.init = function (data) {
        memberid = data.memberid;
        timestamp = data.timestamp;
        styleName = data.styleName;
        styleFamily = data.styleFamily;
    };

    this.isEdit = true;
    this.group = undefined;

    /**
     * @param {!ops.Document} document
     */
    this.execute = function (document) {
        var odtDocument = /**@type{ops.OdtDocument}*/(document),
            styleNode = odtDocument.getFormatting().getStyleElement(styleName, styleFamily);

        if (!styleNode) {
            return false;
        }

        styleNode.parentNode.removeChild(styleNode);

        odtDocument.getOdfCanvas().refreshCSS();
        odtDocument.emit(ops.OdtDocument.signalCommonStyleDeleted, {name: styleName, family: styleFamily});
        return true;
    };

    /**
     * @return {!ops.OpRemoveStyle.Spec}
     */
    this.spec = function () {
        return {
            optype: "RemoveStyle",
            memberid: memberid,
            timestamp: timestamp,
            styleName: styleName,
            styleFamily: styleFamily
        };
    };
};
/**@typedef{{
    optype:string,
    memberid:string,
    timestamp:number,
    styleName:string,
    styleFamily:string
 }}*/
ops.OpRemoveStyle.Spec;
/**@typedef{{
    memberid:string,
    timestamp:(number|undefined),
    styleName:string,
    styleFamily:string
 }}*/
ops.OpRemoveStyle.InitSpec;
