/*globale console require __dirname */

/////////////////////////////////////////////////////////////////////////////////////
// Script to run with nodejs for checking that all .js files have copyright headers
//
// Run this script as follows:
//   node copycheck.js

// Config options:

var IGNORED_NAMES = ['lib', 'node_modules', 'test-resources', 'play-area', 'components'];
var copyright = new RegExp('@license|\\* Copyright \\(c\\)'); // play with this regexp to define what a 'licence header' looks like

/////////////////////////////////////////////////////////////////////////////////////

function contains(list, el) {
	for (var i = 0; i < list.length; i++) {
		if (list[i]===el) {
			return true;
		}
	}
	return false;
}

var filesystem = require('../server/utils/filesystem').withBaseDir(undefined);
var defaultIgnore = require('../server/utils/filesystem').ignore;
var extend = require('../server/jsdepend/utils').extend;
var path = require('path');

var jsdependConf = extend(filesystem, {
	ignore: function ignore(name) {
		//console.log("calling ignore");
		return defaultIgnore(name) || contains(IGNORED_NAMES, name);
	}
});

var fswalk = require('../server/jsdepend/fswalk').configure(jsdependConf).fswalk;
var fs = require('fs');
var endsWith = require('../server/jsdepend/utils').endsWith;

fswalk(path.resolve(__dirname, '..'),
	//Called on each file:
	function (f) {
		if (endsWith(f, ".js")) {
			var contents = fs.readFileSync(f);
			if (copyright.test(contents)) {
				//console.log("OK: "+f);
			} else {
				console.error("BAD: "+f);
			}
		}
	},
	//Called when traversal ends
	function () {
		console.log('DONE: All .js files where analyzed');
	}
);
