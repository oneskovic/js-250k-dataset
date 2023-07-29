(function (global) {
  function sprintf(pattern) {
    var arg = 1;
    var args = arguments;
    function nextarg() {
      if (arg >= args.length) {
        throw Error("Ran out of arguments: " + arg);
      }
      return args[arg++];
    }

    var regex = /([^%]|%([\-+0]*)(\d+)?(\.\d+)?([%csiudobxXf]))/g;

    function repl(str, unit, flags, width, precision, specifier) {

      if (unit.charAt(0) != '%') {
        return unit;
      }

      function toNumber(x) {
        if (typeof x === 'number') { return x; }
        if (typeof x === 'boolean') { return x ? 1 : 0; }
        return parseFloat(String(x));
      }

      // flags
      var left = !!(flags.match(/-/));
      var zero = !!(flags.match(/0/));
      var sign = !!(flags.match(/\+/));

      width = (typeof width === 'string' && width.length > 0) ? parseInt(width, 10) : (void 0);
      precision = (typeof precision === 'string' && precision.length > 1) ? parseInt(precision.substring(1), 10) : (void 0);

      //console.log(unit, "left=", left, "zero=", zero, "width=", width, "precision=", precision, "specifier=", specifier);

      // Stringify

      var r, neg;

      switch (specifier) {
      case '%': // escaped %
        return '%';

      case 'c': // character - handle both printf('%c',65) and printf('%c','A')
        r = nextarg();
        if (typeof r === 'number') { r = String.fromCharCode(r); }
        r = String(r).charAt(0);
        break;

      case 's': // string
        r = String(nextarg());
        if (precision !== (void 0)) { r = r.substring(0, precision); }
        break;

      case 'i': // int32
      case 'u': // uint32
      case 'd': // decimal
      case 'o': // octal
      case 'b': // binary
      case 'x': // hexadecimal
      case 'X': // hexadecimal (uppercase)
      case 'f': // floating point
        r = toNumber(nextarg());
        neg = (r < 0);
        r = Math.abs(r);
        switch (specifier) {
        case 'i': r = (r|0).toString(10); break;
        case 'u': r = (r>>>0).toString(10); break;
        case 'd': r = Math.floor(r).toString(10); break;
        case 'o': r = Math.floor(r).toString(8); break;
        case 'b': r = Math.floor(r).toString(2); break;
        case 'x': r = Math.floor(r).toString(16).toLowerCase(); break;
        case 'X': r = Math.floor(r).toString(16).toUpperCase(); break;
        case 'f': r = (precision !== (void 0)) ? r.toFixed(precision) : r.toString(10); break;
        }
        break;

      default:
        throw Error("Unsupported formatting specifier: " + specifier);
      }

      // Format

      var pad_len = width ? width - r.length : 0;
      var sign_char = '';
      if (neg || sign) {
        --pad_len;
        sign_char = neg ? '-' : '+';
      }

      var pad_char = (zero && !left) ? '0' : ' ';
      var pad = (pad_len > 0) ? (new Array(pad_len + 1)).join(pad_char) : "";

      if (left) {
        return sign_char + r + pad;
      }
      else if (zero) {
        return sign_char + pad + r;
      }
      else {
        return pad + sign_char + r;
      }
    }

    return pattern.replace(regex, repl);
  }

  global.sprintf = sprintf;
}(self));
