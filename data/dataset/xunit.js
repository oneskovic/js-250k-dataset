if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['reporters/xunit.js']) {
  _$jscoverage['reporters/xunit.js'] = [];
  _$jscoverage['reporters/xunit.js'][6] = 0;
  _$jscoverage['reporters/xunit.js'][14] = 0;
  _$jscoverage['reporters/xunit.js'][23] = 0;
  _$jscoverage['reporters/xunit.js'][24] = 0;
  _$jscoverage['reporters/xunit.js'][25] = 0;
  _$jscoverage['reporters/xunit.js'][29] = 0;
  _$jscoverage['reporters/xunit.js'][30] = 0;
  _$jscoverage['reporters/xunit.js'][33] = 0;
  _$jscoverage['reporters/xunit.js'][34] = 0;
  _$jscoverage['reporters/xunit.js'][44] = 0;
  _$jscoverage['reporters/xunit.js'][45] = 0;
  _$jscoverage['reporters/xunit.js'][53] = 0;
  _$jscoverage['reporters/xunit.js'][59] = 0;
  _$jscoverage['reporters/xunit.js'][60] = 0;
  _$jscoverage['reporters/xunit.js'][66] = 0;
  _$jscoverage['reporters/xunit.js'][67] = 0;
  _$jscoverage['reporters/xunit.js'][68] = 0;
  _$jscoverage['reporters/xunit.js'][69] = 0;
  _$jscoverage['reporters/xunit.js'][70] = 0;
  _$jscoverage['reporters/xunit.js'][71] = 0;
  _$jscoverage['reporters/xunit.js'][73] = 0;
  _$jscoverage['reporters/xunit.js'][81] = 0;
  _$jscoverage['reporters/xunit.js'][82] = 0;
  _$jscoverage['reporters/xunit.js'][86] = 0;
  _$jscoverage['reporters/xunit.js'][87] = 0;
  _$jscoverage['reporters/xunit.js'][90] = 0;
  _$jscoverage['reporters/xunit.js'][91] = 0;
  _$jscoverage['reporters/xunit.js'][92] = 0;
  _$jscoverage['reporters/xunit.js'][99] = 0;
  _$jscoverage['reporters/xunit.js'][100] = 0;
}
_$jscoverage['reporters/xunit.js'][6]++;
var Base = require("./base"), utils = require("../utils"), escape = utils.escape;
_$jscoverage['reporters/xunit.js'][14]++;
exports = module.exports = XUnit;
_$jscoverage['reporters/xunit.js'][23]++;
function XUnit(runner) {
  _$jscoverage['reporters/xunit.js'][24]++;
  Base.call(this, runner);
  _$jscoverage['reporters/xunit.js'][25]++;
  var stats = this.stats, tests = [], self = this;
  _$jscoverage['reporters/xunit.js'][29]++;
  runner.on("test end", (function (test) {
  _$jscoverage['reporters/xunit.js'][30]++;
  tests.push(test);
}));
  _$jscoverage['reporters/xunit.js'][33]++;
  runner.on("end", (function () {
  _$jscoverage['reporters/xunit.js'][34]++;
  console.log(tag("testsuite", {name: "Mocha Tests", tests: stats.tests, failures: stats.failures, errors: stats.failures, skip: stats.tests - stats.failures - stats.passes, timestamp: (new Date()).toUTCString(), time: stats.duration / 1000}, false));
  _$jscoverage['reporters/xunit.js'][44]++;
  tests.forEach(test);
  _$jscoverage['reporters/xunit.js'][45]++;
  console.log("</testsuite>");
}));
}
_$jscoverage['reporters/xunit.js'][53]++;
XUnit.prototype.__proto__ = Base.prototype;
_$jscoverage['reporters/xunit.js'][59]++;
function test(test) {
  _$jscoverage['reporters/xunit.js'][60]++;
  var attrs = {classname: test.parent.fullTitle(), name: test.title, time: test.duration / 1000};
  _$jscoverage['reporters/xunit.js'][66]++;
  if ("failed" == test.state) {
    _$jscoverage['reporters/xunit.js'][67]++;
    var err = test.err;
    _$jscoverage['reporters/xunit.js'][68]++;
    attrs.message = escape(err.message);
    _$jscoverage['reporters/xunit.js'][69]++;
    console.log(tag("testcase", attrs, false, tag("failure", attrs, false, cdata(err.stack))));
  }
  else {
    _$jscoverage['reporters/xunit.js'][70]++;
    if (test.pending) {
      _$jscoverage['reporters/xunit.js'][71]++;
      console.log(tag("testcase", attrs, false, tag("skipped", {}, true)));
    }
    else {
      _$jscoverage['reporters/xunit.js'][73]++;
      console.log(tag("testcase", attrs, true));
    }
  }
}
_$jscoverage['reporters/xunit.js'][81]++;
function tag(name, attrs, close, content) {
  _$jscoverage['reporters/xunit.js'][82]++;
  var end = close? "/>": ">", pairs = [], tag;
  _$jscoverage['reporters/xunit.js'][86]++;
  for (var key in attrs) {
    _$jscoverage['reporters/xunit.js'][87]++;
    pairs.push(key + "=\"" + escape(attrs[key]) + "\"");
}
  _$jscoverage['reporters/xunit.js'][90]++;
  tag = "<" + name + (pairs.length? " " + pairs.join(" "): "") + end;
  _$jscoverage['reporters/xunit.js'][91]++;
  if (content) {
    _$jscoverage['reporters/xunit.js'][91]++;
    tag += content + "</" + name + end;
  }
  _$jscoverage['reporters/xunit.js'][92]++;
  return tag;
}
_$jscoverage['reporters/xunit.js'][99]++;
function cdata(str) {
  _$jscoverage['reporters/xunit.js'][100]++;
  return "<![CDATA[" + escape(str) + "]]>";
}
_$jscoverage['reporters/xunit.js'].source = ["","/**"," * Module dependencies."," */","","var Base = require('./base')","  , utils = require('../utils')","  , escape = utils.escape;","","/**"," * Expose `XUnit`."," */","","exports = module.exports = XUnit;","","/**"," * Initialize a new `XUnit` reporter."," *"," * @param {Runner} runner"," * @api public"," */","","function XUnit(runner) {","  Base.call(this, runner);","  var stats = this.stats","    , tests = []","    , self = this;","","  runner.on('test end', function(test){","    tests.push(test);","  });","","  runner.on('end', function(){","    console.log(tag('testsuite', {","        name: 'Mocha Tests'","      , tests: stats.tests","      , failures: stats.failures","      , errors: stats.failures","      , skip: stats.tests - stats.failures - stats.passes","      , timestamp: (new Date).toUTCString()","      , time: stats.duration / 1000","    }, false));","","    tests.forEach(test);","    console.log('&lt;/testsuite&gt;');    ","  });","}","","/**"," * Inherit from `Base.prototype`."," */","","XUnit.prototype.__proto__ = Base.prototype;","","/**"," * Output tag for the given `test.`"," */","","function test(test) {","  var attrs = {","      classname: test.parent.fullTitle()","    , name: test.title","    , time: test.duration / 1000","  };","","  if ('failed' == test.state) {","    var err = test.err;","    attrs.message = escape(err.message);","    console.log(tag('testcase', attrs, false, tag('failure', attrs, false, cdata(err.stack))));","  } else if (test.pending) {","    console.log(tag('testcase', attrs, false, tag('skipped', {}, true)));","  } else {","    console.log(tag('testcase', attrs, true) );","  }","}","","/**"," * HTML tag helper."," */","","function tag(name, attrs, close, content) {","  var end = close ? '/&gt;' : '&gt;'","    , pairs = []","    , tag;","","  for (var key in attrs) {","    pairs.push(key + '=\"' + escape(attrs[key]) + '\"');","  }","","  tag = '&lt;' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;","  if (content) tag += content + '&lt;/' + name + end;","  return tag;","}","","/**"," * Return cdata escaped CDATA `str`."," */","","function cdata(str) {","  return '&lt;![CDATA[' + escape(str) + ']]&gt;';","}"];
