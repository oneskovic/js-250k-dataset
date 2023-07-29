/**
 * @module SoundJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * Loader provides a mechanism to preload Web Audio content via PreloadJS or internally. Instances are returned to
	 * the preloader, and the load method is called when the asset needs to be requested.
	 *
	 * @class WebAudioLoader
	 * @param {String} loadItem The item to be loaded
	 * @param {Object} flash The flash instance that will do the preloading.
	 * @extends XHRRequest
	 * @protected
	 */
	function Loader(loadItem) {
		this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.SOUND);

	};
	var p = createjs.extend(Loader, createjs.AbstractLoader);

	// TODO: deprecated
	// p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


	/**
	 * web audio context required for decoding audio
	 * @property context
	 * @type {AudioContext}
	 * @static
	 */
	Loader.context = null;


// public methods
	p.toString = function () {
		return "[WebAudioLoader]";
	};


// private methods
	p._createRequest = function() {
		this._request = new createjs.XHRRequest(this._item, false);
		this._request.setResponseType("arraybuffer");
	};

	p._sendComplete = function (event) {
		// OJR we leave this wrapped in Loader because we need to reference src and the handler only receives a single argument, the decodedAudio
		Loader.context.decodeAudioData(this._rawResult,
	         createjs.proxy(this._handleAudioDecoded, this),
	         createjs.proxy(this._handleError, this));
	};


	/**
	* The audio has been decoded.
	* @method handleAudioDecoded
	 * @param decoded
	* @protected
	*/
	p._handleAudioDecoded = function (decodedAudio) {
		this._result = decodedAudio;
		this.AbstractLoader__sendComplete();
	};

	createjs.WebAudioLoader = createjs.promote(Loader, "AbstractLoader");
}());
