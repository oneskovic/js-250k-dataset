(function () {
	"use strict";

	var promptManager;
	var os = require('os');

	promptManager = function() {
		if(os.platform() === 'linux' || os.platform() === 'darwin') {
			//this.promptMan = require('./build/Release/promptMan.node');
			this.promptMan = require('promptMan');
			this.promptCore = new this.promptMan.PromptManInt();
		}
		else if(os.platform() === 'win32') {
		}
		else if(os.platform() === 'android') {
		}
	};

	promptManager.prototype.display = function(message, choices ) {
		if(os.platform() === 'linux' || os.platform() === 'darwin' ) {
			return(this.promptCore.display(message, choices));
		}
		else if(os.platform() === 'win32') {
		}
		else if(os.platform() === 'android') {
		}
	};

	exports.promptManager = promptManager;

}());

