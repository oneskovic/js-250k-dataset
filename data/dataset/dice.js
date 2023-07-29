// chat command API
// units - unit templates (from datahandler)
// worldHandler - worldHandler reference
// chatHandler - reference to general chat utils
module.exports = function(units, worldHandler, chatHandler) {
    return {
        requiresEditor: false,
        action: function(unit, target, params) {
            var Q = require('q'),
                color = '#EFC4FF',
                sides = params[0];

            if (Number(sides) > 1) {
                if (sides > 93) sides = 93;
                var randomdice = Math.floor((Math.random() * 10000 % sides) + 1);
            } else {
                sides = 6;
                var randomdice = Math.floor((Math.random() * 10000 % sides) + 1);

            }

            message = '<b>* ' + unit.name + " rolled " + randomdice + ' on a ' + sides + ' sided die. *</b>';

            if (target) {
                chatHandler.announceRoom(target, message, color);
            } else {
                chatHandler.announce(message, color);
            }

            return Q();
        }
    };
};
