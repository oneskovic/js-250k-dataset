/**
 * A grouping class to call a callback after all actions in it have been finished
 * 
 * @constructor
 * @param {Object}
 *            actions The list of actions for which we will wait.
 * @param {Object}
 *            scope The scope for the callback function (null implies global)
 * @param {Function}
 *            callback The function to be called when all actions complete
 */
var ActionCallbackGroup = function ActionCallbackGroup(actions, scope, callback) {
	this.actions = [];
	this.scope = scope;
	this.callback = callback;
	this.hold = true; // used to prevent callbacks when we haven't finished.

	for ( var idx = 0; idx < actions.length; idx++) {
            var action = actions[idx];
            this.actions.push(action);
            action.addCallbackGroup(this);
	}
	//
	// This code deals with actions that may have already been complete.
	// If all actions in the group are complete, we need to catch that here
	// without accidentally triggering early.
	//
	this.hold = false;
	if (this.callback && this.actions.length === 0) {
            this.callback.call(this.scope || window, { "errors" : [] });
	}
};

/**
 * Mark a single action as complete.
 * 
 * This marks the action as complete, and calls the callback if needed.
 * 
 * @param {Action}
 *            the action to mark as complete.
 */
ActionCallbackGroup.prototype.completeAction = function(action) {
	var aidx = this.actions.indexOf(action);
	if (aidx != -1) {
		this.actions.splice(aidx, 1);
		if (this.callback && this.actions.length === 0 && !this.hold) {
			this.callback.call(this.scope || window, {
				"errors" : []
			});
		}
	}
};
