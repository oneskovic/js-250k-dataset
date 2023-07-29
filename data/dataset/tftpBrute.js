'use strict';


// Private stuff

var Tftp = require('tftp-client'),
    async = require('async'),

    printer = require('../utils/printer'),

    HELP = {
        description: 'TFTP files brute force',
        options: {
            target: {
                type: 'ip',
                description: 'Host to attack',
                defaultValue: '127.0.0.1'
            },
            port: {
                type: 'port',
                description: 'Port to attack on chosen IPs',
                defaultValue: 69
            },
            fileList: {
                type: 'userPass',
                description: 'File (or file with them) to test',
                defaultValue: 'file:artifacts/dics/tftp.txt'
            },
            delay: {
                type: 'positiveInt',
                description: 'Delay between requests, in ms.',
                defaultValue: 0
            }
            // TODO: "timeout" not supported by the module (hardcoded, returns 0)
        }
    };


// Public stuff

module.exports.help = HELP;

module.exports.run = function (options, callback) {
    var result = [],
        indexCount = 0; // User with delay to know in which index we are

    // We avoid to parallelize here to control the interval of the requests
    async.eachSeries(options.fileList, function (file, asyncCb) {
        var client = new Tftp(options.port, options.target);

        function delayCb() {
            if (indexCount === options.fileList.length) {
                asyncCb();
            } else {
                setTimeout(asyncCb, options.delay);
            }
        }

        indexCount += 1;

        client.read(file, function (err) {
            // TODO: Destroy/close client, not supported by the module
            if (err) {
                if (/File not found/.test(err)) {
                    printer.infoHigh('File NOT found : ' + file);
                    delayCb();
                } else {
                    asyncCb(err);
                }
            } else {
                result.push({ file : file });
                printer.highlight('File found: ' + file);
                delayCb();
            }
        });
    }, function (err) {
        callback(err, result);
    });
};
