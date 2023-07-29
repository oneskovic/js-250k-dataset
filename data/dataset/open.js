var exec = require('child_process').exec
  , path = require('path')
  ;




module.exports = open;

function open(target, appName, callback) {
  var opener;

  if (typeof(appName) === 'function') {
    callback = appName;
    appName = null;
  }

  switch (process.platform) {
  case 'darwin':
    if (appName) {
      opener = 'open -a "' + escape(appName) + '"';
    } else {
      opener = 'open';
    }
    break;
  case 'win32':
    // if the first parameter to start is quoted, it uses that as the title
    // so we pass a blank title so we can quote the file we are opening
    if (appName) {
      opener = 'start "" "' + escape(appName) + '"';
    } else {
      opener = 'start ""';
    }
    break;
  default:
    if (appName) {
      opener = escape(appName);
    } else {
      // use Portlands xdg-open everywhere else
      opener = path.join(__dirname, '../vendor/xdg-open');
    }
    break;
  }

  return exec(opener + ' "' + escape(target) + '"', callback);
}

function escape(s) {
  return s.replace(/"/g, '\\\"');
}
