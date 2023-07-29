/*global onmessage postMessage importScripts require*/
/**
 * This file should be run as a web-worker so that files can be indexed in the background
 */

importScripts('../../lib/requirejs/require.js');
require.config({
    baseUrl: "../../",
    paths: {
        i18n: 'lib/requirejs/i18n',
        text: 'lib/requirejs/text',
        fileapi: 'scripted/fileapi',
        jsrender: 'lib/jsrender',
		'esprima/esprima' : 'lib/esprima/esprima',
		'doctrine/doctrine' : 'lib/doctrine/doctrine'
    }
});

function get(key) {
	postMessage({ op: 'get', key : key });
}
function status(msg) {
	postMessage({ op: 'status', msg : "Worker: " + msg });
}
function set(key, val) {
	postMessage({ op: 'set', key : key, val : val });
}

function finished() {
	status("Indexer has found all dependencies.  Still waiting to process each dependency.");
	postMessage({ op: 'finished' });
}

function performIndex(filePath) {
	status("Starting indexer for " + filePath + " at " + new Date().getTime());
    require(['indexerService.js'], function(mIndexerService) {
		try {
	        var indexer = new mIndexerService.Indexer(set, get, status);
	        indexer._internalPerformIndex(filePath, finished);
			status("Indexer has been activated on " + filePath);
		} catch (e) {
			status("Error while performing index");
			status(e);
		}
    });
}

onmessage = function(e) {
    if (e.data.op === 'performIndex') {
        performIndex(e.data.filePath);
    }
};
