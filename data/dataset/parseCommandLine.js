'use strict';

var optimist = require('optimist');

function parseCommandLine(config) {
  // optimist default API requires you to write the command name three time
  // This is a small wrapper to accept an object instead
  for (var i = 0; i < config.length; ++i) {
    optimist
      .boolean(config[i].command)
      .default(config[i].command, config[i].default)
      .describe(config[i].command, config[i].description);
  }
  var argv = optimist.argv;

  // optimist doesn't have support for --dev=false, instead it returns 'false'
  for (var i = 0; i < config.length; ++i) {
    var command = config[i].command;
    if (argv[command] === undefined) {
      argv[command] = config[i].default;
    }
    if (argv[command] === 'true') {
      argv[command] = true;
    }
    if (argv[command] === 'false') {
      argv[command] = false;
    }
  }

  // Show --help
  if (argv.help || argv.h) {
    optimist.showHelp();
    process.exit();
  }

  return argv;
}

module.exports = parseCommandLine;
