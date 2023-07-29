define(function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var XmlBehaviour = require("../behaviour/xml").XmlBehaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

function hasType(token, type) {
    var hasType = true;
    var typeList = token.type.split('.');
    var needleList = type.split('.');
    needleList.forEach(function(needle){
        if (typeList.indexOf(needle) == -1) {
            hasType = false;
            return false;
        }
    });
    return hasType;
}

var CfmlBehaviour = function () {

    this.inherit(XmlBehaviour); // Get xml behaviour
    
    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken();

            if (token && hasType(token, 'meta.tag.name') && /^cf+(abort|application|argument|associate|break|cache|collection|cookie|dbinfo|directory|dump|else|elseif|error|exchangecalendar|exchangeconnection|exchangecontact|exchangefilter|exchangetask|exit|feed|file|flush|ftp|header|htmlhead|httpparam|image|import|include|index|insert|invokeargument|location|log|mailparam|NTauthenticate|object|objectcache|param|pdfformparam|print|procparam|procresult|property|queryparam|registry|reportparam|rethrow|return|schedule|search|set|setting|throw|zipparam)$/gi.test(token.value))
                return;
            if (hasType(token, 'string') && iterator.getCurrentTokenColumn() + token.value.length > position.column)
                return;
            var atCursor = false;
            if (!token || !hasType(token, 'meta.tag') && !(hasType(token, 'text') && token.value.match('/'))){
                do {
                    token = iterator.stepBackward();
                } while (token && (hasType(token, 'string') || hasType(token, 'keyword.operator') || hasType(token, 'entity.attribute-name') || hasType(token, 'text')));
            } else {
                atCursor = true;
            }
            if (!token || !hasType(token, 'meta.tag.name') || iterator.stepBackward().value.match('/')) {
                return
            }
            var element = token.value;
            if (atCursor){
                var element = element.substring(0, position.column - token.start);
            }
            if (voidElements.indexOf(element) !== -1){
                return;
            }
            return {
               text: '>' + '</' + element + '>',
               selection: [1, 1]
            }
        }
    });
}
oop.inherits(CfmlBehaviour, XmlBehaviour);

exports.CfmlBehaviour = CfmlBehaviour;
});
