define(function(require, exports, module) {

var useragent = require("pilot/useragent");
var keyUtil  = require("pilot/keys");
var event = require("pilot/event");
var settings  = require("pilot/settings").settings;
var canon = require("pilot/canon");
require("ace/commands/default_commands");

var KeyBinding = function(editor) {
    this.$editor = editor;
    this.$data = { };
    this.$keyboardHandler = null;
};

(function() {
    this.setKeyboardHandler = function(keyboardHandler) {
        if (this.$keyboardHandler != keyboardHandler) {
            this.$data = { };
            this.$keyboardHandler = keyboardHandler;
        }
    };

    this.getKeyboardHandler = function() {
        return this.$keyboardHandler;
    };

    this.$callKeyboardHandler = function (e, hashId, keyOrText, keyCode) {
        var env = {editor: this.$editor},
            toExecute;

        if (this.$keyboardHandler) {
            toExecute =
                this.$keyboardHandler.handleKeyboard(this.$data, hashId, keyOrText, keyCode, e);
        }

        // If there is nothing to execute yet, then use the default keymapping.
        if (!toExecute || !toExecute.command) {
            if (hashId != 0 || keyCode != 0) {
                toExecute = {
                    command: canon.findKeyCommand(env, "editor", hashId, keyOrText)
                }
            } else {
                toExecute = {
                    command: "inserttext",
                    args: {
                        text: keyOrText
                    }
                }
            }
        }

        var success = false;
        if (toExecute) {
            success = canon.exec(toExecute.command,
                                        env, "editor", toExecute.args);
            if (success) {
                event.stopEvent(e);
            }
        }
        return success;
    };

    this.onCommandKey = function(e, hashId, keyCode, keyString) {
        // In case there is no keyString, try to interprete the keyCode.
        if (!keyString) {
            keyString = keyUtil.keyCodeToString(keyCode);
        }
        return this.$callKeyboardHandler(e, hashId, keyString, keyCode);
    };

    this.onTextInput = function(text) {
        return this.$callKeyboardHandler({}, 0, text, 0);
    }

}).call(KeyBinding.prototype);

exports.KeyBinding = KeyBinding;
});
