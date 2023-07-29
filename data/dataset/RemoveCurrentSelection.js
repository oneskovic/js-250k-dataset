/*global define*/

define(["BenchmarkAction"], function(BenchmarkAction) {
    "use strict";

    /**
     * Remove the entire selection
     * @constructor
     */
    function RemoveCurrentSelection() {
        var state = {description: "Remove the current selection"},
            action = new BenchmarkAction(state);

        this.subscribe = action.subscribe;
        this.state = state;

        /**
         * @param {!OdfBenchmarkContext} context
         */
        this.start = function(context) {
            context.recordDistanceFromCurrentSelection(state);
            action.start();
            context.sessionController.getTextController().removeCurrentSelection();
            action.stop();
            action.complete(true);
        };
    }

    return RemoveCurrentSelection;
});
