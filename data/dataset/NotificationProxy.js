/*global Windows:true */

var cordova = require('cordova');

var isAlertShowing = false;
var alertStack = [];

module.exports = {
    alert:function(win, loseX, args) {

        if (isAlertShowing) {
            var later = function () {
                module.exports.alert(win, loseX, args);
            };
            alertStack.push(later);
            return;
        }
        isAlertShowing = true;

        var message = args[0];
        var _title = args[1];
        var _buttonLabel = args[2];

        var md = new Windows.UI.Popups.MessageDialog(message, _title);
        md.commands.append(new Windows.UI.Popups.UICommand(_buttonLabel));
        md.showAsync().then(function() {
            isAlertShowing = false;
            win && win();

            if (alertStack.length) {
                setTimeout(alertStack.shift(), 0);
            }

        });
    },

    confirm:function(win, loseX, args) {

        if (isAlertShowing) {
            var later = function () {
                module.exports.confirm(win, loseX, args);
            };
            alertStack.push(later);
            return;
        }

        isAlertShowing = true;

        var message = args[0];
        var _title = args[1];
        var _buttonLabels = args[2];

        var result;

        var btnList = [];
        function commandHandler (command) {
            result = btnList[command.label];
        }

        var md = new Windows.UI.Popups.MessageDialog(message, _title);
        var button = _buttonLabels.split(',');

        for (var i = 0; i<button.length; i++) {
            btnList[button[i]] = i+1;
            md.commands.append(new Windows.UI.Popups.UICommand(button[i],commandHandler));
        }
        md.showAsync().then(function() {
            isAlertShowing = false;
            win && win(result);
            if (alertStack.length) {
                setTimeout(alertStack.shift(), 0);
            }

        });
    },

    beep:function(winX, loseX, args) {

        // set a default args if it is not set
        args = args && args.length ? args : ["1"];

        var snd = new Audio('ms-winsoundevent:Notification.Default');
        var count = parseInt(args[0]) || 1;
        snd.msAudioCategory = "Alerts";

        var onEvent = function () {
            if (count > 0) {
                snd.play();
            } else {
                snd.removeEventListener("ended", onEvent);
                snd = null;
                winX && winX(); // notification.js just sends null, but this is future friendly
            }
            count--;
        };
        snd.addEventListener("ended", onEvent);
        onEvent();

    }
};

require("cordova/exec/proxy").add("Notification",module.exports);
