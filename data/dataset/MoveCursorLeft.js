/*global define*/

define(["BenchmarkAction"], function(BenchmarkAction) {
    "use strict";

    /**
     * Move cursor the requested number of steps to the left
     * @constructor
     * @param {!number} steps Number of steps to move the cursor
     */
    function MoveCursorLeft(steps) {
        var state = {description: "Move cursor to the left (x" + steps + ")"},
            action = new BenchmarkAction(state);

        this.subscribe = action.subscribe;
        this.state = state;

        /**
         * @param {!OdfBenchmarkContext} context
         */
        this.start = function(context) {
            var count;
            context.storeCurrentPosition(state);
            action.start();
            for (count = 0; count < steps; count += 1) {
                context.sessionController.getSelectionController().moveCursorToLeft();
            }
            action.stop();
            context.recordDistanceFromPreviousPosition(state);
            action.complete(true);
        };
    }

    return MoveCursorLeft;
});
