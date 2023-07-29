var util = require('bespin:util/util');

/**
 * A invisible singleton canvas on the page, useful whenever a canvas context
 * is needed (e.g. for computing text sizes), but an actual canvas isn't handy
 * at the moment.
 * @constructor
 */
var ScratchCanvas = function() {
    this._canvas = document.getElementById('bespin-scratch-canvas');

    // It's possible that another ScratchCanvas instance in another sandbox
    // exists on the page. If so, we assume they're compatible, and use
    // that one.
    if (util.none(this._canvas)) {
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'bespin-scratch-canvas';
        this._canvas.width = 400;
        this._canvas.height = 300;
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = "-10000px";
        this._canvas.style.left = "-10000px";
        document.body.appendChild(this._canvas);
    }
};

ScratchCanvas.prototype.getContext = function() {
    return this._canvas.getContext('2d');
};

/**
 * Returns the width in pixels of the given string ("M", by default) in the
 * given font.
 */
ScratchCanvas.prototype.measureStringWidth = function(font, str) {
    if (util.none(str)) {
        str = "M";
    }

    var context = this.getContext();
    context.save();
    context.font = font;
    var width = context.measureText(str).width;
    context.restore();
    return width;
};

var singleton = null;

/**
 * Returns the instance of the scratch canvas on the page, creating it if
 * necessary.
 */
exports.get = function() {
    if (singleton === null) {
        singleton = new ScratchCanvas();
    }
    return singleton;
};
