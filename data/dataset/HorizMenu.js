 
 
var HorizMenu = Menu.extend({
    _init: function(args) {
        this._super(args);
        this._lineTop = args.lineTop;
        this._textLefts = args.textLefts;
        this._pointerLefts = args.pointerLefts;
    },
    
    /* Draw the pointer at the current selection */
    drawPointer: function() {

        // Get the left at which the pointer should be
        var drawLeft = this._pointerLefts[this._current % this._num];

        // Draw pointer image
        var img = g_imageData.images["pointer"].img;
        textCtx.drawImage(img, drawLeft, this._lineTop + 2);
        
        this._pointer = true;
    },
    
    /* Clear the pointer at the current selection */
    clearPointer: function() {

        // Get the left at which the pointer should be
        var drawLeft = this._pointerLefts[this._current % this._num];
        
        // Size of pointer image is 16, 11
        textCtx.clearRect(drawLeft, this._lineTop + 2, 16, 11);
        
        this._pointer = false;
    },
    
    /* Override this to draw text differently */
    drawText: function() {
        for (var i = 0; i < this._num; ++i) {
        
            // Determine if text should be selectable
            textCtx.fillStyle = this._flags ? (this._flags[i] ? "gray" : "white") : "white";
            
            // Draw the text
            textCtx.fillText(this._texts[i], this._textLefts[i], this._lineTop);
        }
    }
});