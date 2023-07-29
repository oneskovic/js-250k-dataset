Aria.classDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.autoselect.Handler",
    $implements : ["aria.resources.handlers.IResourcesHandler"],
    $templates : ["aria.widgets.form.list.templates.LCTemplate", "aria.widgets.form.list.templates.ListTemplate"],
    $dependencies : ["aria.widgets.form.list.templates.ListTemplateScript"],
    $prototype : {
        /**
         * Call the callback with an array of suggestions in its arguments.
         * @param {String} textEntry Search string
         * @param {aria.core.CfgBeans.Callback} callback Called when suggestions are ready
         */
        getSuggestions : function (text, cb) {
            this.$callback(cb, [text, text]);
        },

        /**
         * Returns the classpath of the default template for this resourceHandler. This method is used only by
         * aria.widgets.controllers.AutoCompleteController
         * @return {String}
         */
        getDefaultTemplate : function () {
            return "aria.widgets.form.list.templates.LCTemplate";
        },

        /**
         * Provide a label for given suggestion
         * @param {Object} suggestion
         * @return {String}
         */
        suggestionToLabel : function (text) {
            return text;
        },

        /**
         * Call the callback with all possible suggestions.
         * @param {aria.core.CfgBeans.Callback} callback
         */
        getAllSuggestions : function (cb) {
            this.$callback(cb, ["all"]);
        }
    }
});
