define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var CobolHighlightRules = require("./cobol_highlight_rules").CobolHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = CobolHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "*";

    this.$id = "ace/mode/cobol";
}).call(Mode.prototype);

exports.Mode = Mode;

});
