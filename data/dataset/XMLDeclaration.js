(function() {
  var XMLDeclaration, XMLNode, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash-node');

  XMLNode = require('./XMLNode');

  module.exports = XMLDeclaration = (function(_super) {
    __extends(XMLDeclaration, _super);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var _ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (_.isObject(version)) {
        _ref = version, version = _ref.version, encoding = _ref.encoding, standalone = _ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      if (version != null) {
        this.version = this.stringify.xmlVersion(version);
      }
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.clone = function() {
      return _.create(XMLDeclaration.prototype, this);
    };

    XMLDeclaration.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (options != null ? options.indent : void 0) || '  ';
      newline = (options != null ? options.newline : void 0) || '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<?xml';
      if (this.version != null) {
        r += ' version="' + this.version + '"';
      }
      if (this.encoding != null) {
        r += ' encoding="' + this.encoding + '"';
      }
      if (this.standalone != null) {
        r += ' standalone="' + this.standalone + '"';
      }
      r += '?>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);
