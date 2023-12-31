(function() {
  var ADRBG, PRNG, WordArray, XOR, browser_rng, e, generate, iced, m, more_entropy, native_rng, rng, util, __iced_k, __iced_k_noop, _browser_rng_primitive, _native_rng, _prng, _ref, _ref1;

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  more_entropy = require('more-entropy');

  ADRBG = require('./drbg').ADRBG;

  WordArray = require('./wordarray').WordArray;

  XOR = require('./combine').XOR;

  util = require('./util');

  _browser_rng_primitive = null;

  browser_rng = function(n) {
    var v;
    v = new Uint8Array(n);
    _browser_rng_primitive(v);
    return new Buffer(v);
  };

  _browser_rng_primitive = (m = typeof window !== "undefined" && window !== null ? (_ref = window.crypto) != null ? _ref.getRandomValues : void 0 : void 0) != null ? m.bind(window.crypto) : (m = typeof window !== "undefined" && window !== null ? (_ref1 = window.msCrypto) != null ? _ref1.getRandomValues : void 0 : void 0) != null ? m.bind(window.msCrypto) : null;

  if (_browser_rng_primitive != null) {
    _native_rng = browser_rng;
  } else {
    try {
      rng = require('cry' + 'pto').rng;
      if (rng != null) {
        _native_rng = rng;
      }
    } catch (_error) {
      e = _error;
    }
  }

  native_rng = function(x) {
    if (_native_rng == null) {
      throw new Error('No rng found; tried requiring "crypto" and window.crypto');
    }
    return _native_rng(x);
  };

  PRNG = (function() {
    function PRNG() {
      this.meg = new more_entropy.Generator();
      this.adrbg = new ADRBG(((function(_this) {
        return function(n, cb) {
          return _this.gen_seed(n, cb);
        };
      })(this)), XOR.sign);
    }

    PRNG.prototype.now_to_buffer = function() {
      var buf, d, ms, s;
      d = Date.now();
      ms = d % 1000;
      s = Math.floor(d / 1000);
      buf = new Buffer(8);
      buf.writeUInt32BE(s, 0);
      buf.writeUInt32BE(ms, 4);
      return buf;
    };

    PRNG.prototype.gen_seed = function(nbits, cb) {
      var b, bufs, cat, nbytes, wa, words, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      nbytes = nbits / 8;
      bufs = [];
      bufs.push(this.now_to_buffer());
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/triplesec/src/prng.iced",
            funcname: "PRNG.gen_seed"
          });
          _this.meg.generate(nbits, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return words = arguments[0];
              };
            })(),
            lineno: 83
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          var _i, _len;
          bufs.push(_this.now_to_buffer());
          bufs.push(new Buffer(words));
          bufs.push(native_rng(nbytes));
          bufs.push(_this.now_to_buffer());
          cat = Buffer.concat(bufs);
          wa = WordArray.from_buffer(cat);
          util.scrub_buffer(cat);
          for (_i = 0, _len = bufs.length; _i < _len; _i++) {
            b = bufs[_i];
            util.scrub_buffer(b);
          }
          return cb(wa);
        };
      })(this));
    };

    PRNG.prototype.generate = function(n, cb) {
      return this.adrbg.generate(n, cb);
    };

    return PRNG;

  })();

  _prng = null;

  generate = function(n, cb) {
    if (_prng == null) {
      _prng = new PRNG();
    }
    return _prng.generate(n, cb);
  };

  exports.PRNG = PRNG;

  exports.generate = generate;

  exports.native_rng = native_rng;

}).call(this);
