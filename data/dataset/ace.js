define(function(require, exports, module) {
"use strict";

require("./lib/fixoldbrowsers");

var dom = require("./lib/dom");
var event = require("./lib/event");

var Editor = require("./editor").Editor;
var EditSession = require("./edit_session").EditSession;
var UndoManager = require("./undomanager").UndoManager;
var Renderer = require("./virtual_renderer").VirtualRenderer;
var MultiSelect = require("./multi_select").MultiSelect;

// The following require()s are for inclusion in the built ace file
require("./worker/worker_client");
require("./keyboard/hash_handler");
require("./placeholder");
require("./mode/folding/fold_mode");
require("./theme/textmate");

exports.config = require("./config");

/**
 * Provides access to require in packed noconflict mode
 * @param {String} moduleName
 * @returns {Object}
 *
 **/
exports.require = require;

/**
 * Embeds the Ace editor into the DOM, at the element provided by `el`.
 * @param {String | DOMElement} el Either the id of an element, or the element itself
 *
 **/
exports.edit = function(el) {
    if (typeof(el) == "string") {
        var _id = el;
        var el = document.getElementById(_id);
        if (!el)
            throw "ace.edit can't find div #" + _id;
    }

    if (el.env && el.env.editor instanceof Editor)
        return el.env.editor;

    var doc = exports.createEditSession(dom.getInnerText(el));
    el.innerHTML = '';

    var editor = new Editor(new Renderer(el));
    new MultiSelect(editor);
    editor.setSession(doc);

    var env = {
        document: doc,
        editor: editor,
        onResize: editor.resize.bind(editor, null)
    };
    event.addListener(window, "resize", env.onResize);
    editor.on("destroy", function() {
        event.removeListener(window, "resize", env.onResize);
    });
    el.env = editor.env = env;
    return editor;
};

/**
 * Creates a new [[EditSession]], and returns the associated [[Document]].
 * @param {Document | String} text {:textParam}
 * @param {TextMode} mode {:modeParam}
 * 
 **/
exports.createEditSession = function(text, mode) {
    var doc = new EditSession(text, doc);
    doc.setUndoManager(new UndoManager());
    return doc;
}
exports.EditSession = EditSession;
exports.UndoManager = UndoManager;
});
