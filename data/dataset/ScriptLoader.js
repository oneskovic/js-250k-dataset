var Aria = require("../Aria");
var ariaUtilsType = require("./Type");
var ariaCoreBrowser = require("../core/Browser");


/**
 * Utility to load external scripts. Please do NOT use it for loading Aria Templates classes (the ones that use
 * <code>Aria.classDefinition()</code>) and templates. Use <code>Aria.load()</code> instead, which is capable of
 * caching, resolving dependencies and reading multipart files containing templates.
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.utils.ScriptLoader",
    $singleton : true,
    $constructor : function () {
        this._queueIndex = 0;
        this._queueCount = {};
        /**
         * Array of scripts that were already loaded *in the main document*
         * (`Aria.$frameworkWindow.document`).
         */
        this._loadedScripts = [];
    },
    $destructor : function () {
        this._queueCount = null;
        this._loadedScripts = null;
    },
    $prototype : {

        /**
         * Load the scripts then call a callback function
         * @param {Array} scripts - An array of scripts to load
         * @param {Function} callback - A function to call once the whole set of scripts are loaded
         * @param {Object} options - (optional) { document: Document, force: Boolean }
         * `document` options specifies document into which the scripts should be injected.
         * If the document is different than `Aria.$frameworkWindow.document` then the script
         * won't be added to `_loadedScripts` array.
         */
        load : function (scripts, callback, options) {
            var i, ii, url, scriptNode, scriptCount;

            var options = options || {};
            var document = options.document || Aria.$frameworkWindow.document;
            var isTargetMainDocument = (document === Aria.$frameworkWindow.document);

            var loadedScripts = this._loadedScripts;
            var queueIndex = this._queueIndex;
            var head = document.getElementsByTagName('head')[0];
            var that = this;
            var onReadyStateChangeCallback = function (queueId, scriptNode) {
                var key = "" + queueId;
                that._queueCount[key]--;
                if (that._queueCount[key] === 0) {
                    delete that._queueCount[key];
                    that.$callback(callback);
                }
            };

            if (ariaUtilsType.isString(scripts)) {
                scripts = [scripts];
            }

            scriptCount = 0;
            for (i = 0, ii = scripts.length; i < ii; i++) {
                url = scripts[i];
                if (!loadedScripts[url] || !isTargetMainDocument) {
                    scriptCount++;
                    if (isTargetMainDocument) {
                        loadedScripts[url] = true;
                    }
                    scriptNode = document.createElement('script');
                    scriptNode.setAttribute("type", "text/javascript");
                    if (callback) {
                        this._addScriptLoadedCallback(scriptNode, onReadyStateChangeCallback, [queueIndex, scriptNode]);
                    }
                    scriptNode.src = url;
                    head.appendChild(scriptNode);
                }
            }
            if (scriptCount === 0) {
                this.$callback(callback);
            } else {
                this._queueCount["" + queueIndex] = scriptCount;
            }
            this._queueIndex++;
        },

        /**
         * Load the scripts then call a callback function
         * @param {HTMLElement} scriptNode The script node to manage
         * @param {Function} callback The callback to call once the script is loaded
         * @param {Array} callbackArgs an array of arguments to be given to the callback
         * @private
         */
        _addScriptLoadedCallback : function (scriptNode, callback, callbackArgs) {
            if (ariaCoreBrowser.isOldIE) {
                this._addScriptLoadedCallback = function (scriptNode, callback, callbackArgs) {
                    scriptNode.onreadystatechange = function () {
                        if (this.readyState == 'complete' || this.readyState == 'loaded') {
                            callback.apply(null, callbackArgs);
                        }
                    };
                };
            } else {
                this._addScriptLoadedCallback = function (scriptNode, callback, callbackArgs) {
                    scriptNode.onload = function () {
                        callback.apply(null, callbackArgs);
                    };
                };
            }
            this._addScriptLoadedCallback.call(this, scriptNode, callback, callbackArgs);
        }
    }
});
