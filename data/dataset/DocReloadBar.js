/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, Mustache */

/*
 * UI for the Document Reload bar which is responsible to ask the user if they
 * would like to reload the preview pane with the newly open document when the
 * user switches between html elements
 */
define(function (require, exports, module) {
	"use strict";

	var ModalBar				= brackets.getModule("widgets/ModalBar").ModalBar,
		DocumentManager			= brackets.getModule("document/DocumentManager"),
		FileUtils				= brackets.getModule("file/FileUtils"),

		Strings					= require("strings"),
		ResponseUtils			= require("utils/ResponseUtils"),
	
		/**
		 * @private
		 * The template we use for all Find bars.
		 * @type {string}
		 */
		_htmlTemplate = require("text!htmlContent/docreload-bar.html");
	
	/**
	 * @constructor
	 */
	function DocReloadBar() {
		
	}

	/** 
	 * @private
	 * @type {?ModalBar} Modal bar containing this find bar's UI
	 */
	DocReloadBar.prototype._modalBar = null;

	DocReloadBar.prototype.open = function () {
		var bar = this;
		
		if (!this._modalBar) {
			this._modalBar = new ModalBar(Mustache.render(_htmlTemplate, Strings), false);
			
			var $root = this._modalBar.getRoot();
			$root
				.on("click", "#docreload-ok", function (e) {
				
					// We don't want normalized line endings, so it's important to pass true to getText()
					var docToSave = DocumentManager.getCurrentDocument();
					if (docToSave.isDirty) {
						FileUtils.writeText(docToSave.file, docToSave.getText(true))
							.done(function () {
								// reload the contents of the preview pane
								ResponseUtils.refreshPreviewPane();
								bar.close();

								// notify that document has been saved
								docToSave.notifySaved();
							})
							.fail(function (err) {
								console.error("unexpected error trying to save document", err);
								/*
								if (err === FileSystemError.CONTENTS_MODIFIED) {
									handleContentsModified();
								} else {
									handleError(err);
								}
								*/
							});
					} else {
						// reload the contents of the preview pane
						ResponseUtils.refreshPreviewPane();
						bar.close();
					}
				})
				.on("click", "#docreload-cancel", function (e) {
					bar.close();
				});
		}
	};

	DocReloadBar.prototype.close = function (e) {

		if (e) { e.stopImmediatePropagation(); }
		if (this._modalBar) {
			this._modalBar.close();
			this._modalBar = null;
		}
	};
	
	exports.DocReloadBar = DocReloadBar;
});
