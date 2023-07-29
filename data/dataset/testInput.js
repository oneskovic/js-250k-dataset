var Promise = require('bespin:promise').Promise;

var keyboard = require('keyboard:keyboard');

var Input = require('command_line:input').Input;
var t = require('plugindev');

function parse(command) {
    var promise = new Promise();

    new Input(command).argsPromise.then(function(args) {
        promise.resolve({
            args: args,
            input: command
        });
    }, t.never());

    return promise;
}

exports.testInput = function() {
    parse('set maxConsoleHeight 300').then(function(data) {
        console.log('data', data);
        t.deepEquals(data.args, {}, '');
    });
};

/*
 *
 */

({
    "description": "blah blah",
    "provides":
    [
        {
            "ep": "command",
            "name": "tst",
            "description": "Test Command"
        },
        {
            "ep": "command",
            "name": "tst list",
            "params":
            [
                {
                    "name": "first",
                    "type": "text",
                    "description": "First param"
                }
            ],
            "description": "Tst List",
            "pointer": "test/testcommands#tstList"
        },
        {
            "ep": "command",
            "name": "tst add",
            "params":
            [
                {
                    "name": "first",
                    "type": "text",
                    "description": "First param"
                },
                {
                    "name": "second",
                    "type": { "name": "selection", "data": [ "aa", "bb" ] },
                    "description": "Second param"
                },
                {
                    "name": "third",
                    "type": "number",
                    "description": "Third param",
                    "defaultValue": 42
                },
                {
                    "name": "fourth",
                    "type": "boolean",
                    "description": "Fourth param",
                    "defaultValue": true
                }
            ],
            "description": "Tst Add",
            "pointer": "test/testcommands#tstAdd"
        },
        {
            "ep": "command",
            "name": "tst remove",
            "params": [],
            "description": "Tst Remove",
            "pointer": "test/testcommands#tstRemove"
        }
    ]
});
