/*global ops */

/**
 * @constructor
 * @implements ops.Operation
 */
ops.OpSetBlob = function OpSetBlob() {
    "use strict";

    var memberid, timestamp, filename, mimetype, content;

    /**
     * @param {!ops.OpSetBlob.InitSpec} data
     */
    this.init = function (data) {
        memberid = data.memberid;
        timestamp = data.timestamp;
        filename = data.filename;
        mimetype = data.mimetype;
        content = data.content;
    };

    this.isEdit = true;
    this.group = undefined;

    /**
     * @param {!ops.Document} document
     */
    this.execute = function (document) {
        var odtDocument = /**@type{ops.OdtDocument}*/(document);
        odtDocument.getOdfCanvas().odfContainer().setBlob(filename, mimetype, content);
        return true;
    };

    /**
     * @return {!ops.OpSetBlob.Spec}
     */
    this.spec = function () {
        return {
            optype: "SetBlob",
            memberid: memberid,
            timestamp: timestamp,
            filename: filename,
            mimetype: mimetype,
            content: content
        };
    };
};
/**@typedef{{
    optype:string,
    memberid:string,
    timestamp:number,
    filename:string,
    mimetype:string,
    content:string
 }}*/
ops.OpSetBlob.Spec;
/**@typedef{{
    memberid:string,
    timestamp:(number|undefined),
    filename:string,
    mimetype:string,
    content:string
 }}*/
ops.OpSetBlob.InitSpec;
