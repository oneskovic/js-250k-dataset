var CR = require("../reply").CR,
    LF = require("../reply").LF,
    InlineReply = require("./inlineReply").InlineReply;


var toSmallString = require("../perf").toSmallString;

var IntegerReply = exports.IntegerReply = function IntegerReply () {
    this.isComplete = false;
    this.replyValue = "";
    this.i = 0;
};

IntegerReply.prototype.parse = function (data, atDataIndex) {
    var dataLen = data.length,
        line = this.replyValue;
    while (atDataIndex < dataLen) {
        if (data[atDataIndex] === CR) {
            if (++atDataIndex < dataLen) {
                atDataIndex++;
                this.isComplete = true;
                break;
            }
        } else if (data[atDataIndex] === LF) {
            atDataIndex++;
            this.isComplete = true;
            break;
        } else {
            line += String.fromCharCode(data[atDataIndex++]);
        }
    }
    if (this.isComplete) this.replyValue = parseInt(line, 10);
    else this.replyValue = line;

//    atDataIndex = InlineReply.prototype.parse.call(this, data, atDataIndex);
//    if (this.isComplete) {
//        this.replyValue = parseInt(this.replyValue, 10);
//    }
    return atDataIndex;
};
