var path = require('path'),
    bin = path.join(__dirname,'..','bin'),
    exec = require('child_process').exec;

var params = function(options,callback) {
  callback = callback || function(){};
  options = options || {};
  if (typeof options === 'function'){
    callback = options;
    options = {};
  }
  if (typeof options !== 'object'){
    throw 'Invalid options parameter.';
  }
  return {options:options,callback:callback};
}

module.exports = {
  
  elevate: function(cmd,options,callback) {
    var p = params(options,callback);
    exec('"'+path.join(bin,'elevate','elevate.cmd')+'" '+cmd,p.options,p.callback);
  },

  /**
   * @method sudo
   * @member nodewindows
   * Sudo acts similarly to `sudo` on Linux/Mac. Unlike _elevate_, it requires a password, but it
   * will not prompt the user for permission to proceed. Like _elevate_, this
   * _still requires administrative privileges_ for the user, otherwise the command will fail.
   * The primary difference between this and _elevate()_ is the prompt.
   *
   * **Syntax**:
   *
   * `sudo(cmd,password[,options,callback])`
   *
   * @param {String} cmd
   * The command to execute with elevated privileges. This can be any string that would be typed at the command line.
   * @param {String} password
   * The password of the user
   * @param {Object} [options]
   * Any options that will be passed to `require('child_process').exec(cmd,<OPTIONS>,callback)`.
   * @param {Function} [callback]
   * The callback function passed to `require('child_process').exec(cmd,options,<CALLBACK>)`.
   */
  sudo: function(cmd,password,options,callback){
    password = password || '';
    if (typeof password !== 'string'){
      callback = options;
      options = password;
      password = '';
    }
    var p = params(options,callback);
    exec(path.join(bin,'sudowin','sudo.exe')+' '+(password !== '' ? '-p '+password:'')+cmd,p.options,p.callback);
  }
}
