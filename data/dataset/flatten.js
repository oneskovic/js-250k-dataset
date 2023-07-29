exports = typeof exports !== "undefined" ? exports : {};

var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;
var Template = require("montage/core/template").Template;

var Flatten = exports.Flatten = Component.specialize( {
    hasTemplate: {
        value: true
    },

    loadTemplate: {value: function (callback) {
        if (this._isTemplateLoading) return;
        this._isTemplateLoading = true;
        var self = this;
        var templateModuleId, info, moduleId;

        var onTemplateLoad = function (reel) {
            self._template = reel;
            self._isTemplateLoaded = true;
            self._isTemplateLoading = false;
            // TODO: only need to change this part on Component.loadTemplate to make it generic for any component, we need a way for a component to say they want to be expanded... at the moment we'll only use it for repetitions I'd say.
            reel.flatten(function () {
                reel.instantiateWithComponent(self);
                if (callback) {
                    callback();
                }
            });
        }

        templateModuleId = this.templateModuleId;
        if (!templateModuleId) {
            info = Montage.getInfoForObject(this);
            moduleId = info.moduleId;
            filename =  moduleId.split("/").pop();
            templateModuleId = info.moduleId + ".reel/" + filename + ".html"
        }
        new Template().initWithModuleId(templateModuleId, onTemplateLoad);
    }}
});
