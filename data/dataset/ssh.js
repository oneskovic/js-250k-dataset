var crypto = require('crypto')
  , fs = require('fs')
  , logging = require('./logging')
  , spawn = require('child_process').spawn
  , Step = require('step')
;


var generate_keypair = exports.generate_keypair = function(comment, path, callback) {
  var readfiles = false
    , random_str
  if (arguments.length === 2) {
    readfiles = true
    random_str = crypto.randomBytes(16).toString('hex');
    callback = path
    path = '/tmp/' + random_str
  }

  var cmd = "ssh-keygen";
  var args = ["-t", "dsa", "-N", "", "-C", comment,  "-f", path];
  console.debug("generate_keypair() command: %s args: %s", cmd, args);
  Step(
    function stepOne() {
      try {
        fs.unlink(path, this.parallel());
        fs.unlink(path + ".pub", this.parallel());
      } catch(e) {
        // do nothing
      }
    },
    function stepTwo() {
      var keyp = spawn(cmd, args)
        , next = this

      keyp.on("exit", function(code) {
        if (readfiles) return next(code)
        callback(code && new Error('failed to generate keypair'));
      });
    },
    function stepThree(err) {
      if (err) return callback(new Error('failed to generate keypair'))
      var one = this.parallel()
        , two = this.parallel()
      fs.readFile(path, function (err, data) {
        fs.unlink(path, function (err2) {
          one(err || err2, data)
        })
      })
      fs.readFile(path + '.pub', function (err, data) {
        fs.unlink(path + '.pub', function (err2) {
          two(err || err2, data)
        })
      })
    },
    callback
  );
}
