var commandConfig = {
    // TODO Move this functionality into Reply.prototype?
    info: {
        typecastReplyValue: function (replyValue) {
            var info = {};
            replyValue.replace(/\r\n$/, '').split("\r\n").forEach( function (line) {
                var parts = line.split(":");
                info[parts[0]] = parts[1];
            });
            return replyValue = info;
        }
    },
    exists: {
        typecastReplyValue: function (replyValue) {
            return replyValue === 1;
        }
    },

    zrange: {
        typecastReplyValue: function (replyValue, originalCommand) {
            if (!originalCommand.withscores) {
                return replyValue;
            }
            var arr = replyValue, hash, currKey, newArr = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ((i % 2) === 0) {
                    currKey = arr[i];
                } else {
                    hash = {};
                    hash[currKey] = arr[i];
                    newArr.push(hash);
                }
            }
            return replyValue = newArr;
        }
    }
};

commandConfig.zrangebyscore = commandConfig.zrevrange = commandConfig.zrange;

module.exports = commandConfig;
