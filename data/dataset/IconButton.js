var Aria = require("../../Aria");
var ariaWidgetsIcon = require("../Icon");
var ariaWidgetsActionButton = require("./Button");


/**
 * Class definition for the button widget.
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.widgets.action.IconButton",
    $extends : ariaWidgetsActionButton,
    /**
     * ActionWidget constructor
     * @param {aria.widgets.CfgBeans:ActionWidgetCfg} cfg the widget configuration
     * @param {aria.templates.TemplateCtxt} ctxt template context
     */
    $constructor : function (cfg, ctxt, lineNumber) {
        this.$Button.constructor.apply(this, arguments);

        /**
         * Instance of the Icon widget used by this widget.
         * @type aria.widgets.Icon
         * @protected
         */
        this._icon = new ariaWidgetsIcon({
            icon : cfg.icon,
            sourceImage : cfg.sourceImage
        }, ctxt, lineNumber);
    },
    $destructor : function () {
        this._icon.$dispose();
        this.$Button.$destructor.call(this);
    },
    $prototype : {
        /**
         * Overwrite the Button class content markup method to write the icon
         * @param {aria.templates.MarkupWriter} out Markup writer
         * @private
         */
        _widgetMarkupContent : function (out) {
            this._icon.writeMarkup(out);
        }
    }
});
