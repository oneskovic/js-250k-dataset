/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var VBScriptHighlightRules = require("./vbscript_highlight_rules").VBScriptHighlightRules;

var Mode = function() {
    var highlighter = new VBScriptHighlightRules();
    
    this.$tokenizer = new Tokenizer(highlighter.getRules());
};
oop.inherits(Mode, TextMode);

(function() {
       
    this.lineCommentStart = ["'", "REM"];
    
}).call(Mode.prototype);

exports.Mode = Mode;
});