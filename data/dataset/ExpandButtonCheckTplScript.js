Aria.tplScriptDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.expandbutton.test3.ExpandButtonCheckTplScript",
    $dependencies : ["aria.resources.handlers.LCResourcesHandler"],
    $constructor : function () {
        this.dateUtils = aria.utils.Date;
        this._lcHandler = new aria.resources.handlers.LCResourcesHandler();
        this._lcHandler.setSuggestions([{
                    label : 'Air France',
                    code : 'AF'
                }, {
                    label : 'Air Canada',
                    code : 'AC'
                }, {
                    label : 'Finnair',
                    code : '--'
                }, {
                    label : 'Quantas',
                    code : '--'
                }, {
                    label : 'American Airlines',
                    code : 'AA'
                }, {
                    label : 'Emirates',
                    code : '--'
                }]);
    },
    $destructor : function () {
        this._lcHandler.$dispose();
        this._lcHandler = null;
    },
    $prototype : {
        _getAirLinesHandler : function () {
            return this._lcHandler;
        }
    }
});
