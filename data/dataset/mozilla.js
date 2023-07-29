// This file is for Mozilla-specific functionality that doesn't really apply
// to others.

"define metadata";
({
    "provides": [
        {
            "ep": "command",
            "name": "feedback",
            "description": "Let us know how we can make Bespin better.",
            "pointer": "#feedbackCommand"
        }
    ]
});
"end";

var env = require('environment').env;

exports.feedbackCommand = function(args, request) {
    window.open('http://feedback.mozillalabs.com/forums/49087-bespin',
        'feedback');
};
