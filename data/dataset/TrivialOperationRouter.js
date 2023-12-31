/*global ops, runtime, core*/

/*
 * route the operations.
 * this implementation immediately passes them to the
 * playback function.
 * other implementations might want to send them to a
 * server and wait for foreign ops.
 */

/**
 * @constructor
 * @implements ops.OperationRouter
 */
ops.TrivialOperationRouter = function TrivialOperationRouter() {
    "use strict";

    var events = new core.EventNotifier([
            ops.OperationRouter.signalProcessingBatchStart,
            ops.OperationRouter.signalProcessingBatchEnd
        ]),
        /**@type{!ops.OperationFactory}*/
        operationFactory,
        playbackFunction,
        /**@type{number}*/
        groupIdentifier = 0;

    /**
     * Sets the factory to use to create operation instances from operation specs.
     *
     * @param {!ops.OperationFactory} f
     * @return {undefined}
     */
    this.setOperationFactory = function (f) {
        operationFactory = f;
    };

    /**
     * Sets the method which should be called to apply operations.
     *
     * @param {!function(!ops.Operation):boolean} playback_func
     * @return {undefined}
     */
    this.setPlaybackFunction = function (playback_func) {
        playbackFunction = playback_func;
    };

    /**
     * Brings the locally created operations into the game.
     *
     * @param {!Array.<!ops.Operation>} operations
     * @return {undefined}
     */
    this.push = function (operations) {
        // This is an extremely simplistic and VERY temporary implementation of operation grouping.
        // In order to improve undo behaviour, the undo manager requires knowledge about what groups
        // of operations were queued together, so these can be stored in a single undo state.
        // The current implementation is only designed for a localeditor instance & the TrivialUndoManager.
        // TODO redesign this concept to work with collaborative editing
        groupIdentifier += 1;
        events.emit(ops.OperationRouter.signalProcessingBatchStart, {});
        operations.forEach(function (op) {
            var /**@type{?ops.Operation}*/
                timedOp,
                opspec = op.spec();

            opspec.timestamp = Date.now();
            timedOp = operationFactory.create(opspec);
            timedOp.group = "g" + groupIdentifier;

            // TODO: handle return flag in error case
            playbackFunction(timedOp);
        });
        events.emit(ops.OperationRouter.signalProcessingBatchEnd, {});
    };

    /**
     * @param {function()} cb
     */
    this.close = function (cb) {
        cb();
    };

    /**
     * @param {!string} eventId
     * @param {!Function} cb
     * @return {undefined}
     */
    this.subscribe = function (eventId, cb) {
        events.subscribe(eventId, cb);
    };

    /**
     * @param {!string} eventId
     * @param {!Function} cb
     * @return {undefined}
     */
    this.unsubscribe = function (eventId, cb) {
        events.unsubscribe(eventId, cb);
    };

    /**
     * @return {!boolean}
     */
    this.hasLocalUnsyncedOps = function () {
        return false;
    };

    /**
     * @return {!boolean}
     */
    this.hasSessionHostConnection = function () {
        return true;
    };
};
