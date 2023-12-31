/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var RustHighlightRules = require("./rust_highlight_rules").RustHighlightRules;
// TODO: pick appropriate fold mode
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = RustHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "/\\*";
    this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/rust";
}).call(Mode.prototype);

exports.Mode = Mode;
});