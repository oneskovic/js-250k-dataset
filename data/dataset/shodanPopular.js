'use strict';


// Private stuff

var ShodanClient = require('shodan-client'),

    HELP = {
        description: 'Quick access to popular SHODAN related queries',
        options: {
            tag: {
                type: 'allValid',
                description: 'Specific tag to search about. Use "all" to avoid filtering',
                defaultValue : 'voip'
            },
            timeout : {
                type: 'positiveInt',
                description: 'Time to wait for a response, in ms.',
                defaultValue: 10000
            }
        }
    };


// Public stuff

module.exports.help = HELP;

module.exports.run = function (options, callback) {
    var reqOptions  = {
        timeout: options.timeout
    },
    shodanClient = new ShodanClient(reqOptions);

    if (options.tag === 'all') {
        shodanClient.popular(callback);
    } else {
        shodanClient.popularTag(options.tag, callback);
    }
};
