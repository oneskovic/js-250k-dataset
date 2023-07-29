/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

define(function (require, exports, module) {

    "use strict";

    // Registry for languages that have specific per-language URLs or file paths that we use
    // elsewhere in Brackets.
    //
    // TODO: dynamically populate the local prefix list below?
    module.exports = {
        root: true,
        "cs": true,
        "da": true,
        "de": true,
        "es": true,
        "fa-ir": true,
        "fi": true,
        "fr": true,
        "hr": true,
        "id": true,
        "it": true,
        "ja": true,
        "ko": true,
        "nb": true,
        "pl": true,
        "pt-br": true,
        "pt-pt": true,
        "ru": true,
        "sv": true,
        "zh-cn": true,
        "tr": true
    };
});
