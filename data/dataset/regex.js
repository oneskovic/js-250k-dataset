/*global define */
/*jslint browser:true regexp:false*/
/**
 * @name orion.editor.regex
 * @class Utilities for dealing with regular expressions.
 * @description Utilities for dealing with regular expressions.
 */
define("orion/editor/regex", [], function() {
	/**
	 * @methodOf orion.editor.regex
	 * @static
	 * @description Escapes regex special characters in the input string.
	 * @param {String} str The string to escape.
	 * @returns {String} A copy of <code>str</code> with regex special characters escaped.
	 */
	function escape(str) {
		return str.replace(/([\\$\^*\/+?\.\(\)|{}\[\]])/g, "\\$&");
	}

	/**
	 * @methodOf orion.editor.regex
	 * @static
	 * @description Parses a pattern and flags out of a regex literal string.
	 * @param {String} str The string to parse. Should look something like <code>"/ab+c/"</code> or <code>"/ab+c/i"</code>.
	 * @returns {Object} If <code>str</code> looks like a regex literal, returns an object with properties
	 * <code><dl>
	 * <dt>pattern</dt><dd>{String}</dd>
	 * <dt>flags</dt><dd>{String}</dd>
	 * </dl></code> otherwise returns <code>null</code>.
	 */
	function parse(str) {
		var regexp = /^\s*\/(.+)\/([gim]{0,3})\s*$/.exec(str);
		if (regexp) {
			return {
				pattern : regexp[1],
				flags : regexp[2]
			};
		}
		return null;
	}

	return {
		escape: escape,
		parse: parse
	};
});
