// Generated by CoffeeScript 1.4.0
var TarGz, fs, fstream, tar, zlib;

fstream = require('fstream');

tar = require('tar');

zlib = require('zlib');

fs = require('fs');

TarGz = (function() {

  function TarGz(level, memLevel, proprietary) {
    this.level = level != null ? level : 6;
    this.memLevel = memLevel != null ? memLevel : 6;
    this.proprietary = proprietary != null ? proprietary : true;
    this;

  }

  TarGz.prototype.compress = function(source, destination, callback) {
    var self;
    self = this;
    fs.stat(source, function(err, stat) {
      var type;
      type = 'Directory';
      return process.nextTick(function() {
        var gzip, props, reader;
        gzip = zlib.createGzip({
          level: self.level,
          memLevel: self.memLevel
        });
        if (type === 'Directory') {
          reader = fstream.Reader({
            path: source,
            type: type
          });
        }
        if (self.proprietary === true) {
          props = {
            noProprietary: false
          };
        }
        if (self.proprietary === false) {
          props = {
            noProprietary: true
          };
        }
        return reader.pipe(tar.Pack(props)).pipe(gzip).pipe(fstream.Writer(destination).on('close', function() {
          if (typeof callback === 'function') {
            return callback(null);
          }
        }));
      });
    });
    return this;
  };

  TarGz.prototype.extract = function(source, destination, callback) {
    var self;
    self = this;
    process.nextTick(function() {
      return fstream.Reader({
        path: source,
        type: 'File'
      }).pipe(zlib.createGunzip()).pipe(tar.Extract({
        path: destination
      })).on('end', function() {
        if (typeof callback === 'function') {
          return callback(null);
        }
      });
    });
    return this;
  };

  return TarGz;

})();

module.exports = TarGz;
