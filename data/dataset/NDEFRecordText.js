var t = require('ripple/platform/tizen/2.0/typecast'),
    NDEFRecordInternal = require('ripple/platform/tizen/2.0/NDEFRecordInternal'),
    NDEFRecordText;

NDEFRecordText = function (text, languageCode, encoding) {
    var payload = [], i;

    t.NDEFRecordText(arguments, this);

    encoding = encoding || "UTF8";

    // Store languageCode in payload
    payload.push(languageCode.length);
    for (i = 0; i < languageCode.length; i++) {
        payload.push(languageCode.charCodeAt(i));
    }

    // Store text in payload
    for (i = 0; i < text.length; i++) {
        payload.push(text.charCodeAt(i));
    }

    NDEFRecordInternal.call(this, tizen.nfc.NFC_RECORD_TNF_WELL_KNOWN,
            ["T".charCodeAt(0)], payload, []);

    this.__defineGetter__("text", function () {
        return text;
    });

    this.__defineGetter__("languageCode", function () {
        return languageCode;
    });

    this.__defineGetter__("encoding", function () {
        return encoding;
    });
};

module.exports = NDEFRecordText;
