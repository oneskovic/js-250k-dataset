Aria.tplScriptDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.paste.PasteTestCaseTplScript",
    $dependencies : ["aria.resources.handlers.LCResourcesHandler"],
    $destructor : function () {
        if (this.handler) {
            this.handler.$dispose();
        }
    },
    $prototype : {
        onchange : function () {
            this.data.onchange = true;
        },

        getHandler : function () {
            var handler = new aria.resources.handlers.LCResourcesHandler();
            handler.threshold = 1;
            handler.setSuggestions([{
                        label : "Argentina",
                        code : "ARG"
                    }, {
                        label : "Australia",
                        code : "AUS"
                    }, {
                        label : "Canada",
                        code : "CAN"
                    }, {
                        label : "England",
                        code : "ENG"
                    }, {
                        label : "Fiji",
                        code : "FJI"
                    }, {
                        label : "France",
                        code : "FRA"
                    }, {
                        label : "Georgia",
                        code : "GEO"
                    }, {
                        label : "Ireland",
                        code : "IRE"
                    }, {
                        label : "Italy",
                        code : "ITA"
                    }, {
                        label : "Japan",
                        code : "JPN"
                    }, {
                        label : "Namibia",
                        code : "NAM"
                    }, {
                        label : "New Zealand",
                        code : "NZL"
                    }, {
                        label : "Romania",
                        code : "ROM"
                    }, {
                        label : "Russia",
                        code : "RUS"
                    }, {
                        label : "Samoa",
                        code : "SAM"
                    }, {
                        label : "Scotland",
                        code : "SCO"
                    }, {
                        label : "South Africa",
                        code : "RSA"
                    }, {
                        label : "Tonga",
                        code : "TGA"
                    }, {
                        label : "USA",
                        code : "USA"
                    }, {
                        label : "Wales",
                        code : "WAL"
                    }]);

            this.handler = handler;
            return handler;
        }
    }
});
