Aria.classDefinition({
    $classpath : "test.aria.widgetLibs.sampleWidget.test.SampleContainerWidget",
    $extends : "aria.widgetLibs.BaseWidget",
    $dependencies : ["aria.utils.String", "aria.utils.Dom"],
    $constructor : function (cfg, ctxt, lineNumber) {
        this.$BaseWidget.constructor.apply(this, arguments);

        /**
         * Id of the main DOM element of this widget.
         * @type String
         */
        this._id = this._createDynamicId();

        /**
         * Reference of the DOM element with id this._id.
         * @type HTMLElement
         */
        this._domElt = null;
    },
    $prototype : {
        /**
         * Main widget entry-point. Write the beginning of the widget markup, corresponding to the opening tag (for a
         * container widget).
         * @param {aria.templates.MarkupWriter} out
         */
        writeMarkupBegin : function (out) {
            var cfg = this._cfg;
            var html = ['<span id="', this._id, '">', '<span>', aria.utils.String.escapeHTML(cfg.title), '</span>'];
            out.write(html.join(''));
            out.skipContent = cfg.skipContent === true;
        },

        /**
         * Write the end of the widget markup, corresponding to the closing tag (for a container widget).
         * @param {aria.templates.MarkupWriter} out
         */
        writeMarkupEnd : function (out) {
            out.write(aria.utils.String.escapeHTML(this._cfg.end) + '</span>');
        },

        /**
         * Initialization method called after the markup of the widget has been inserted in the DOM.
         */
        initWidget : function () {
            this._domElt = aria.utils.Dom.getElementById(this._id);
            var titleElt = aria.utils.Dom.getDomElementChild(this._domElt, 0);
            titleElt.innerHTML += aria.utils.String.escapeHTML(this._cfg.add);
        }
    }
});
