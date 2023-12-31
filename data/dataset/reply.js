var util = require("util");

var PLUS      = 0x2B, // +
    MINUS     = 0x2D, // -
    DOLLAR    = 0x24, // $
    STAR      = 0x2A, // *
    COLON     = 0x3A, // :

    CR        = exports.CR = 0x0D, // \r
    LF        = exports.LF = 0x0A; // \n

var Reply = exports.Reply = function Reply () {};

var ErrorReply = require("./replies/errorReply").ErrorReply,
    InlineReply = require("./replies/inlineReply").InlineReply,
    IntegerReply = require("./replies/integerReply").IntegerReply,
    BulkReply = require("./replies/bulkReply").BulkReply,
    MultiBulkReply = require("./replies/multibulkReply").MultibulkReply;

Reply.type2constructor = {};
Reply.type2constructor[MINUS] = ErrorReply;
Reply.type2constructor[PLUS] = InlineReply;
Reply.type2constructor[COLON] = IntegerReply;
Reply.type2constructor[DOLLAR] = BulkReply;
Reply.type2constructor[STAR] = MultibulkReply;

/**
 * Factory method for creating replies. Figures out what type of reply (error, status,
 * integer, bulk, multibulk) to construct.
*/
Reply.fromTypeCode = function (typeCode, client, context) {
    var replyClass = this.type2constructor[typeCode],
        newContext;
    if (context && (context.scope === "exec")) {
        context.currTxnCmdIndex = (typeof context.currTxnCmdIndex === "undefined") ? -1 : context.currTxnCmdIndex;
        context.currTxnCmdIndex++;
    }
    if (replyClass === MultibulkReply) {
        // Setup the context to pass to the new MULTIBULK reply
        newContext = {};
        if (client.commandHistory.length > 0) { // If this isn't a message or pmessage
            if (!context || !context.scope) {
                newContext.scope = client.commandHistory.peek().commandName;
            } else if (context.scope === "sort") {
                newContext.scope = context.scope;
                newContext.parsingSort = true;
            } else if (context.scope === "exec") {
                newContext.scope = context.scope;
                newContext.currCommandName = client.currTxnCommands[context.currTxnCmdIndex].commandName;
            }
        }
    } else if (!replyClass) {
//        throw new Error("Invalid type code: " + util.inspect(String.fromCharCode(typeCode)));
        return replyClass;
    }
    return new replyClass(client, newContext);
};
