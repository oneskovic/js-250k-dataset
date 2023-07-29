(function() {
	"use strict";

	var SubstLexer = function() {};
	var p = SubstLexer.prototype;

	SubstLexer.SUBST_TYPES = {
		"$" : null,
		"&" : "subst_match",
		"`" : "subst_pre",
		"'" : "subst_post"
	};
	
	p.string = null;
	p.token = null;
	p.errors = null;
	p.substMode = true;

	p.parse = function(str, capGroups) {
		this.string = str;
		this.errors = [];
		
		var prev = this.token = null;
		for (var i=0, l=str.length; i<l; i+=token.l) {
			var c=str[i], token = {prev:prev, i:i, l:1, js:true};

			if (this.substMode && c == "$" && i+1<l) {
				this.parseSubst(str, token, capGroups);
			} else if (c == "\\") {
				this.parseEsc(str, token, false);
			}

			if (!token.type) {
				token.type = "js_char";
				token.code = c.charCodeAt(0);
			}


			if (prev) { prev.next = token; }
			if (!this.token) { this.token = token; }
			token.end = token.i+token.l;
			if (token.err) { this.errors.push(token.err); }
			prev = token;
		}

		return this.token;
	};
	
	p.parseSubst = function(str, token, capGroups) {
		var match = str.substr(token.i+1).match(/^([$&`']|\d\d?)/);
		if (!match) { return; }
		var d = match[0];
		
		token.type = SubstLexer.SUBST_TYPES[d];

		if (token.type === undefined) {
			var group = parseInt(d), numGroups = capGroups.length;
			if (d.length > 1 && group > numGroups) { d=d[0]; group=parseInt(d); }
			if (group > 0 && group <= numGroups) {
				token.type = "subst_num";
				token.group = capGroups[group-1];
				token.l += d.length-1;
			}
		}
		if (token.type !== undefined) { token.clss = "subst"; token.l++; }
	};
	
	p.parseEsc = RegExLexer.prototype.parseEsc;
	
	window.SubstLexer = SubstLexer;
})();
