WebInspector.CodeMirrorDragToAdjustNumberController = function(codeMirror)
{
    this._codeMirror = codeMirror;

    this._dragToAdjustController = new WebInspector.DragToAdjustController(this);
};

WebInspector.CodeMirrorDragToAdjustNumberController.prototype = {
    constructor: WebInspector.CodeMirrorDragToAdjustNumberController,

    // Public

    get enabled()
    {
        return this._dragToAdjustController.enabled;
    },

    set enabled(enabled)
    {
        if (this.enabled === enabled)
            return;
        
        this._dragToAdjustController.element = this._codeMirror.getWrapperElement();
        this._dragToAdjustController.enabled = enabled;
    },

    // Protected

    dragToAdjustControllerActiveStateChanged: function(dragToAdjustController)
    {
        if (!dragToAdjustController.active)
            this._hoveredTokenInfo = null;
    },

    dragToAdjustControllerCanBeActivated: function(dragToAdjustController)
    {
        return !this._codeMirror.getOption("readOnly");
    },

    dragToAdjustControllerCanBeAdjusted: function(dragToAdjustController)
    {

        return this._hoveredTokenInfo && this._hoveredTokenInfo.containsNumber;
    },

    dragToAdjustControllerWasAdjustedByAmount: function(dragToAdjustController, amount)
    {
        this._codeMirror.alterNumberInRange(amount, this._hoveredTokenInfo.startPosition, this._hoveredTokenInfo.endPosition, false);
    },

    dragToAdjustControllerDidReset: function(dragToAdjustController)
    {
        this._hoveredTokenInfo = null;
    },

    dragToAdjustControllerCanAdjustObjectAtPoint: function(dragToAdjustController, point)
    {
        var position = this._codeMirror.coordsChar({left: point.x, top: point.y});
        var token = this._codeMirror.getTokenAt(position);

        if (!token || !token.type || !token.string) {
            if (this._hoveredTokenInfo)
                dragToAdjustController.reset();
            return false;
        }

        // Stop right here if we're hovering the same token as we were last time.
        if (this._hoveredTokenInfo && this._hoveredTokenInfo.line === position.line &&
            this._hoveredTokenInfo.token.start === token.start && this._hoveredTokenInfo.token.end === token.end)
            return this._hoveredTokenInfo.token.type.indexOf("number") !== -1;

        var containsNumber = token.type.indexOf("number") !== -1;
        this._hoveredTokenInfo = {
            token: token,
            line: position.line,
            containsNumber: containsNumber,
            startPosition: {
                ch: token.start,
                line: position.line
            },
            endPosition: {
                ch: token.end,
                line: position.line
            }
        };
        
        return containsNumber;
    }
};

CodeMirror.defineOption("dragToAdjustNumbers", true, function(codeMirror, value, oldValue) {
    if (!codeMirror.dragToAdjustNumberController)
        codeMirror.dragToAdjustNumberController = new WebInspector.CodeMirrorDragToAdjustNumberController(codeMirror);
    codeMirror.dragToAdjustNumberController.enabled = value;
});
