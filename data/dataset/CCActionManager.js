/**
 * Base singleton object for ccs.ActionManager.
 * @class
 * @name ccs.actionManager
 */
ccs.actionManager = /** @lends ccs.actionManager# */{
    _actionDic: {},

    /**
     * Init properties with json dictionary
     * @param {String} jsonName
     * @param {Object} dic
     * @param {Object} root
     */
    initWithDictionary: function (jsonName, dic, root) {
        var path = jsonName;
        var pos = path.lastIndexOf("/");
        var fileName = path.substr(pos + 1, path.length);
        var actionList = dic["actionlist"];
        var locActionList = [];
        for (var i = 0; i < actionList.length; i++) {
            var locAction = new ccs.ActionObject();
            var locActionDic = actionList[i];
            locAction.initWithDictionary(locActionDic, root);
            locActionList.push(locAction);
        }
        this._actionDic[fileName] = locActionList;
    },

    /**
     * Gets an actionObject with a name.
     * @param {String} jsonName
     * @param {String} actionName
     * @returns {ccs.ActionObject}
     */
    getActionByName: function (jsonName, actionName) {
        var path = jsonName;
        var pos = path.lastIndexOf("/");
        var fileName = path.substr(pos + 1, path.length);
        var actionList = this._actionDic[fileName];
        if (!actionList)
            return null;
        for (var i = 0; i < actionList.length; i++) {
            var locAction = actionList[i];
            if (actionName === locAction.getName())
                return locAction;
        }
        return null;
    },

    /**
     * Play an Action with a name.
     * @param {String} jsonName
     * @param {String} actionName
     * @param {cc.CallFunc} fun
     */
    playActionByName: function (jsonName, actionName, fun) {
        var action = this.getActionByName(jsonName, actionName);
        if (action)
            action.play(fun);
    },
    
     /**
     * Stop an Action with a name.
     * @param {String} jsonName
     * @param {String} actionName
     */
    stopActionByName: function (jsonName, actionName) {
        var action = this.getActionByName(jsonName, actionName);
        if (action)
            action.stop();
    },

    /**
     * Release all actions.
     */
    releaseActions: function () {
        this._actionDic = {};
    },

	/**
	 * Clear data: Release all actions.
	 */
	clear: function() {
		this._actionDic = {};
	}
};
