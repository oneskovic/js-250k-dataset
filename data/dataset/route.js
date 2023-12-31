if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['router/route.js']) {
  _$jscoverage['router/route.js'] = [];
  _$jscoverage['router/route.js'][11] = 0;
  _$jscoverage['router/route.js'][29] = 0;
  _$jscoverage['router/route.js'][30] = 0;
  _$jscoverage['router/route.js'][31] = 0;
  _$jscoverage['router/route.js'][32] = 0;
  _$jscoverage['router/route.js'][33] = 0;
  _$jscoverage['router/route.js'][34] = 0;
  _$jscoverage['router/route.js'][48] = 0;
  _$jscoverage['router/route.js'][49] = 0;
  _$jscoverage['router/route.js'][69] = 0;
  _$jscoverage['router/route.js'][70] = 0;
  _$jscoverage['router/route.js'][71] = 0;
  _$jscoverage['router/route.js'][72] = 0;
  _$jscoverage['router/route.js'][73] = 0;
  _$jscoverage['router/route.js'][77] = 0;
  _$jscoverage['router/route.js'][78] = 0;
  _$jscoverage['router/route.js'][79] = 0;
  _$jscoverage['router/route.js'][88] = 0;
}
_$jscoverage['router/route.js'][11]++;
module.exports = Route;
_$jscoverage['router/route.js'][29]++;
function Route(method, path, callbacks, options) {
  _$jscoverage['router/route.js'][30]++;
  options = options || {};
  _$jscoverage['router/route.js'][31]++;
  this.path = path;
  _$jscoverage['router/route.js'][32]++;
  this.method = method;
  _$jscoverage['router/route.js'][33]++;
  this.callbacks = callbacks;
  _$jscoverage['router/route.js'][34]++;
  this.regexp = normalize(path, this.keys = [], options.sensitive, options.strict);
}
_$jscoverage['router/route.js'][48]++;
Route.prototype.match = (function (path) {
  _$jscoverage['router/route.js'][49]++;
  return this.regexp.exec(path);
});
_$jscoverage['router/route.js'][69]++;
function normalize(path, keys, sensitive, strict) {
  _$jscoverage['router/route.js'][70]++;
  if (path instanceof RegExp) {
    _$jscoverage['router/route.js'][70]++;
    return path;
  }
  _$jscoverage['router/route.js'][71]++;
  if (path instanceof Array) {
    _$jscoverage['router/route.js'][72]++;
    path = "(" + path.join("|") + ")";
  }
  _$jscoverage['router/route.js'][73]++;
  path = path.concat(strict? "": "/?").replace(/\/\(/g, "(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, (function (_, slash, format, key, capture, optional) {
  _$jscoverage['router/route.js'][77]++;
  keys.push({name: key, optional: ! ! optional});
  _$jscoverage['router/route.js'][78]++;
  slash = slash || "";
  _$jscoverage['router/route.js'][79]++;
  return "" + (optional? "": slash) + "(?:" + (optional? slash: "") + (format || "") + (capture || (format && "([^/.]+?)" || "([^/]+?)")) + ")" + (optional || "");
})).replace(/([\/.])/g, "\\$1").replace(/\*/g, "(.*)");
  _$jscoverage['router/route.js'][88]++;
  return new RegExp("^" + path + "$", sensitive? "": "i");
}
_$jscoverage['router/route.js'].source = ["/*!"," * Express - router - Route"," * Copyright(c) 2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;"," * MIT Licensed"," */","","/**"," * Expose `Route`."," */","","module.exports = Route;","","/**"," * Initialize `Route` with the given HTTP `method`, `path`,"," * and an array of `callbacks` and `options`."," *"," * Options:"," *"," *   - `sensitive`    enable case-sensitive routes"," *   - `strict`       enable strict matching for trailing slashes"," *"," * @param {String} method"," * @param {String} path"," * @param {Array} callbacks"," * @param {Object} options."," * @api private"," */","","function Route(method, path, callbacks, options) {","  options = options || {};","  this.path = path;","  this.method = method;","  this.callbacks = callbacks;","  this.regexp = normalize(path","    , this.keys = []","    , options.sensitive","    , options.strict);","}","","/**"," * Check if this route matches `path` and return captures made."," *"," * @param {String} path"," * @return {Array}"," * @api private"," */","","Route.prototype.match = function(path){","  return this.regexp.exec(path);","};","","/**"," * Normalize the given path string,"," * returning a regular expression."," *"," * An empty array should be passed,"," * which will contain the placeholder"," * key names. For example \"/user/:id\" will"," * then contain [\"id\"]."," *"," * @param  {String|RegExp|Array} path"," * @param  {Array} keys"," * @param  {Boolean} sensitive"," * @param  {Boolean} strict"," * @return {RegExp}"," * @api private"," */","","function normalize(path, keys, sensitive, strict) {","  if (path instanceof RegExp) return path;","  if (path instanceof Array) ","  \tpath = '(' + path.join('|') + ')';","  path = path","    .concat(strict ? '' : '/?')","    .replace(/\\/\\(/g, '(?:/')","    .replace(/(\\/)?(\\.)?:(\\w+)(?:(\\(.*?\\)))?(\\?)?/g, function(_, slash, format, key, capture, optional){","      keys.push({ name: key, optional: !! optional });","      slash = slash || '';","      return ''","        + (optional ? '' : slash)","        + '(?:'","        + (optional ? slash : '')","        + (format || '') + (capture || (format &amp;&amp; '([^/.]+?)' || '([^/]+?)')) + ')'","        + (optional || '');","    })","    .replace(/([\\/.])/g, '\\\\$1')","    .replace(/\\*/g, '(.*)');","  return new RegExp('^' + path + '$', sensitive ? '' : 'i');","}"];
