/*global define*/

define(["BenchmarkAction"], function(BenchmarkAction) {
    "use strict";

    /**
     * Move the cursor to the end of the document using the same interface as the mouse would
     * @constructor
     */
    function MoveCursorToEndDirect() {
        var state = {description: "Move to document end (direct)"},
            action = new BenchmarkAction(state);

        this.subscribe = action.subscribe;
        this.state = state;

        /**
         * @param {!OdfBenchmarkContext} context
         */
        this.start = function(context) {
            var canvasElement,
                range;

            context.storeCurrentPosition(state);
            action.start();

            canvasElement = context.odfCanvas.getElement();
            range = canvasElement.ownerDocument.createRange();
            range.setStart(canvasElement, canvasElement.childNodes.length);
            context.sessionController.getSelectionController().selectRange(range, true, 1);

            action.stop();
            context.recordDistanceFromPreviousPosition(state);
            action.complete(true);
        };
    }

    return MoveCursorToEndDirect;
});
