define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var ScssHighlightRules = require("./scss_highlight_rules").ScssHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CssBehaviour = require("./behaviour/css").CssBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = ScssHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
   
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/scss";
}).call(Mode.prototype);

exports.Mode = Mode;

});
