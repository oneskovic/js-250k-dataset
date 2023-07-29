/*global runtime, core, Uint8Array, ArrayBuffer*/
/*jslint bitwise: true */

/**
 * @constructor
 * @param {!string} encoding
 */
core.ByteArrayWriter = function ByteArrayWriter(encoding) {
    "use strict";
    var self = this,
        /**@type{!number}*/
        length = 0,
        /**@type{!number}*/
        bufferSize = 1024,
        /**@type{!Uint8Array}*/
        data = new Uint8Array(new ArrayBuffer(bufferSize));

    /**
     * @param {!number} extraLength
     * @return {undefined}
     */
    function expand(extraLength) {
        var newData;
        if (extraLength > bufferSize - length) {
            bufferSize = Math.max(2 * bufferSize, length + extraLength);
            newData = new Uint8Array(new ArrayBuffer(bufferSize));
            newData.set(data);
            data = newData;
        }
    }
    /**
     * @param {!core.ByteArrayWriter} writer
     * @return {undefined}
     */
    this.appendByteArrayWriter = function (writer) {
        self.appendByteArray(writer.getByteArray());
    };
    /**
     * @param {!Uint8Array} array
     * @return {undefined}
     */
    this.appendByteArray = function (array) {
        var l = array.length;
        expand(l);
        data.set(array, length);
        length += l;
    };
    /**
     * @param {!Array.<!number>} array
     * @return {undefined}
     */
    this.appendArray = function (array) {
        var l = array.length;
        expand(l);
        data.set(array, length);
        length += l;
    };
    /**
     * @param {!number} value
     * @return {undefined}
     */
    this.appendUInt16LE = function (value) {
        self.appendArray([value & 0xff, (value >> 8) & 0xff]);
    };
    /**
     * @param {!number} value
     * @return {undefined}
     */
    this.appendUInt32LE = function (value) {
        self.appendArray([value & 0xff, (value >> 8) & 0xff,
                (value >> 16) & 0xff, (value >> 24) & 0xff]);
    };
    /**
     * @param {!string} string
     * @return {undefined}
     */
    this.appendString = function (string) {
        self.appendByteArray(runtime.byteArrayFromString(string, encoding));
    };
    /**
     * @return {!number}
     */
    this.getLength = function () {
        return length;
    };
    /**
     * @return {!Uint8Array}
     */
    this.getByteArray = function () {
        var a = new Uint8Array(new ArrayBuffer(length));
        a.set(data.subarray(0, length));
        return a;
    };
};
