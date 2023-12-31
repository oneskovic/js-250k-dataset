require.def("ace/mode/DocCommentHighlightRules",
    [
        "ace/lib/oop",
        "ace/mode/TextHighlightRules"
    ], function(oop, TextHighlightRules) {

var DocCommentHighlightRules = function() {

    this.$rules = {
        "start" : [ {
            token : "comment.doc", // closing comment
            regex : "\\*\\/",
            next : "start"
        }, {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+"
        }, {
            token : "comment.doc",
            regex : "\s+"
        }, {
            token : "comment.doc",
            regex : "[^@\\*]+"
        }, {
            token : "comment.doc",
            regex : "."
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

(function() {

    this.getStartRule = function(start) {
        return {
            token : "comment.doc", // doc comment
            regex : "\\/\\*\\*",
            next: start
        };
    };

}).call(DocCommentHighlightRules.prototype);

return DocCommentHighlightRules;
});