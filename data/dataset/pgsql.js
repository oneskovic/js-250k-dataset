define(function(require, exports, module) {

var oop = require("../lib/oop");
var TextMode = require("../mode/text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var PgsqlHighlightRules = require("./pgsql_highlight_rules").PgsqlHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = PgsqlHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) { 
        if (state == "start" || state == "keyword.statementEnd") {
            return "";
        } else {
            return this.$getIndent(line); // Keep whatever indent the previous line has
        }
    }

    this.$id = "ace/mode/pgsql";
}).call(Mode.prototype);

exports.Mode = Mode;
});
