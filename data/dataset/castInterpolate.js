'use strict';

var interpolate = require('./interpolate');
var mout        = require('mout');

var regExp;
var flags = '';
flags += interpolate.syntax.multiline ? 'm' : '';
flags += interpolate.global ? 'g' : '';
flags += interpolate.ignoreCase ? 'i' : '';
regExp = new RegExp('^' + interpolate.syntax.source + '$', flags);


function castInterpolate(template, replacements, options) {
    var matches = template.match(regExp);
    var placeholder;
    var not;

    if (matches) {
        placeholder = matches[1];

        // Check if exists first
        if (mout.object.has(replacements, placeholder)) {
            return mout.object.get(replacements, placeholder);
        }

        // Handle not (!) (note that !foo! is ignored but !foo isn't)
        if (/^!+?[^!]+$/.test(placeholder)) {
            placeholder = placeholder.replace(/!!+/, '');
            not = placeholder.charAt(0) === '!';
            placeholder = not ? placeholder.substr(1) : placeholder;

            if (mout.object.has(replacements, placeholder)) {
                placeholder = mout.object.get(replacements, placeholder);
                return not ? !placeholder : !!placeholder;
            }
        }
    }

    return interpolate(template, replacements, options);
}

module.exports = castInterpolate;
