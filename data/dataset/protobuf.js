/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var CMode = require("./c_cpp").Mode;
var ProtobufHighlightRules = require("./protobuf_highlight_rules").ProtobufHighlightRules;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    CMode.call(this);
    this.foldingRules = new CStyleFoldMode();
    this.HighlightRules = ProtobufHighlightRules;
};
oop.inherits(Mode, CMode);

(function() {
    // Extra logic goes here.
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/protobuf";
}).call(Mode.prototype);

exports.Mode = Mode;
});