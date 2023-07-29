Curiosity.factory('notebook',function($rootScope, context, moduleManager, $templateCache){
	var notebookObj = {};
	notebookObj.info = {};
	notebookObj.info.currentNotebook = [];
	
	notebookObj.init = function () {
		context.registerModule("notebook", notebookObj);
	}

	notebookObj.load = function (obj) {
		for (var key in obj) {
			notebookObj.info[key] = obj[key];
		}
	}

	notebookObj.store = function () {
		return (notebookObj.info);	
	}

	
	notebookObj.newEmptyNotebook = function (name) {
		var notebook = {};
		notebook.name = name;
		notebook.displayName = "New Notebook";
		notebookObj.info.currentNotebook.push(notebook);
		return (notebook);
	}

	/**
	* @desc find an aggregation from its name, if it missed then create and return a new aggregation
	* @param string name aggregation's name
	* @return the aggregation found or a new aggregation
	*/
	notebookObj.getNotebook = function (name) {
		var i = 0;
		while (i < notebookObj.info.currentNotebook.length) {
			if (name == notebookObj.info.currentNotebook[i].name) {
				return (notebookObj.info.currentNotebook[i]);
			}
			i++;
		}
		return (notebookObj.newEmptyNotebook(name));
	}


	notebookObj.switchDisplay = function (obj) {
		$templateCache.put(obj.name, obj.template);
	}

	return (notebookObj);
});