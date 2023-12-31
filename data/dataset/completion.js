/**
Most of the code adopted from the npm package shell completion code.
See https://github.com/isaacs/npm/blob/master/lib/completion.js
*/

var Q, complete, dumpScript, escape, getOpts, unescape;

Q = require('q');

escape = require('./shell').escape;

unescape = require('./shell').unescape;

module.exports = function() {
  return this.title('Shell completion').helpful().arg().name('raw').title('Completion words').arr().end().act(function(opts, args) {
    var argv, cmd, e, _ref;
    if (process.platform === 'win32') {
      e = new Error('shell completion not supported on windows');
      e.code = 'ENOTSUP';
      e.errno = require('constants').ENOTSUP;
      return this.reject(e);
    }
    if ((process.env.COMP_CWORD == null) || (process.env.COMP_LINE == null) || (process.env.COMP_POINT == null)) {
      return dumpScript(this._cmd._name);
    }
    console.error('COMP_LINE:  %s', process.env.COMP_LINE);
    console.error('COMP_CWORD: %s', process.env.COMP_CWORD);
    console.error('COMP_POINT: %s', process.env.COMP_POINT);
    console.error('args: %j', args.raw);
    opts = getOpts(args.raw);
    _ref = this._cmd._parseCmd(opts.partialWords), cmd = _ref.cmd, argv = _ref.argv;
    return Q.when(complete(cmd, opts), function(compls) {
      console.error('filtered: %j', compls);
      return console.log(compls.map(escape).join('\n'));
    });
  });
};

dumpScript = function(name) {
  var defer, fs, path;
  fs = require('fs');
  path = require('path');
  defer = Q.defer();
  fs.readFile(path.resolve(__dirname, 'completion.sh'), 'utf8', function(err, d) {
    var onError;
    if (err) {
      return defer.reject(err);
    }
    d = d.replace(/{{cmd}}/g, path.basename(name)).replace(/^\#\!.*?\n/, '');
    onError = function(err) {
      if (err.errno === require('constants').EPIPE) {
        process.stdout.removeListener('error', onError);
        return defer.resolve();
      } else {
        return defer.reject(err);
      }
    };
    process.stdout.on('error', onError);
    return process.stdout.write(d, function() {
      return defer.resolve();
    });
  });
  return defer.promise;
};

getOpts = function(argv) {
  var i, line, partialLine, partialWord, partialWords, point, w, word, words;
  line = process.env.COMP_LINE;
  w = +process.env.COMP_CWORD;
  point = +process.env.COMP_POINT;
  words = argv.map(unescape);
  word = words[w];
  partialLine = line.substr(0, point);
  partialWords = words.slice(0, w);
  partialWord = argv[w] || '';
  i = partialWord.length;
  while (partialWord.substr(0, i) !== partialLine.substr(-1 * i) && i > 0) {
    i--;
  }
  partialWord = unescape(partialWord.substr(0, i));
  if (partialWord) {
    partialWords.push(partialWord);
  }
  return {
    line: line,
    w: w,
    point: point,
    words: words,
    word: word,
    partialLine: partialLine,
    partialWords: partialWords,
    partialWord: partialWord
  };
};

complete = function(cmd, opts) {
  var compls, m, o, opt, optPrefix, optWord;
  compls = [];
  if (opts.partialWord.indexOf('-')) {
    compls = Object.keys(cmd._cmdsByName);
  } else {
    if (m = opts.partialWord.match(/^(--\w[\w-_]*)=(.*)$/)) {
      optWord = m[1];
      optPrefix = optWord + '=';
    } else {
      compls = Object.keys(cmd._optsByKey);
    }
  }
  if (!(o = opts.partialWords[opts.w - 1]).indexOf('-')) {
    optWord = o;
  }
  if (optWord && (opt = cmd._optsByKey[optWord])) {
    if (!opt._flag && opt._comp) {
      compls = Q.all([compls, opt._comp(opts)]).spread(function(c, o) {
        return c.concat(o.map(function(v) {
          return (optPrefix || '') + v;
        }));
      });
    }
  }
  if (cmd._comp) {
    compls = Q.all([compls, cmd._comp(opts)]).spread(function(c, o) {
      return c.concat(o);
    });
  }
  return Q.when(compls, function(compls) {
    console.error('partialWord: %s', opts.partialWord);
    console.error('compls: %j', compls);
    return compls.filter(function(c) {
      return c.indexOf(opts.partialWord) === 0;
    });
  });
};
