/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.PlatformFontsSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Fonts"));
    this.element.addStyleClass("platform-fonts");
    WebInspector.domAgent.addEventListener(WebInspector.DOMAgent.Events.AttrModified, this._onNodeChange.bind(this));
    WebInspector.domAgent.addEventListener(WebInspector.DOMAgent.Events.AttrRemoved, this._onNodeChange.bind(this));
    WebInspector.domAgent.addEventListener(WebInspector.DOMAgent.Events.CharacterDataModified, this._onNodeChange.bind(this));

    var cssFontSection = this.element.createChild("div", "stats-section monospace");
    var cssFontPrefix = cssFontSection.createChild("span", "webkit-css-property");
    cssFontPrefix.textContent = "font-family";
    cssFontSection.createTextChild(":");
    this._cssFontValue = cssFontSection.createChild("span", "css-font-value");

    this._fontStatsSection = this.element.createChild("div", "stats-section");
}

WebInspector.PlatformFontsSidebarPane.prototype = {
    _onNodeChange: function()
    {
        if (this._innerUpdateTimeout)
            return;
        this._innerUpdateTimeout = setTimeout(this._innerUpdate.bind(this), 100);
    },

    /**
     * @param {WebInspector.DOMNode=} node
     */
    update: function(node)
    {
        if (!node) {
            delete this._node;
            return;
        }
        this._node = node;
        this._innerUpdate();
    },

    _innerUpdate: function()
    {
        if (this._innerUpdateTimeout) {
            clearTimeout(this._innerUpdateTimeout);
            delete this._innerUpdateTimeout;
        }
        if (!this._node)
            return;
        WebInspector.cssModel.getPlatformFontsForNode(this._node.id, this._refreshUI.bind(this, this._node));
    },

    /**
     * @param {String} cssFamilyName
     * @param {WebInspector.DOMNode} node
     */
    _refreshUI: function(node, cssFamilyName, platformFonts)
    {
        if (this._node !== node)
            return;
        this._cssFontValue.textContent = cssFamilyName + ";";
        this._fontStatsSection.removeChildren();

        if (!platformFonts || !platformFonts.length)
            return;
        platformFonts.sort(function (a, b) {
            return b.glyphCount - a.glyphCount;
        });
        for (var i = 0; i < platformFonts.length; ++i) {
            var fontStatElement = this._fontStatsSection.createChild("div", "font-stats-item");

            var fontNameElement = fontStatElement.createChild("span", "font-name");
            fontNameElement.textContent = platformFonts[i].familyName;

            var fontDelimeterElement = fontStatElement.createChild("span", "delimeter");
            fontDelimeterElement.textContent = "\u2014";

            var fontUsageElement = fontStatElement.createChild("span", "font-usage");
            var usage = platformFonts[i].glyphCount;
            fontUsageElement.textContent = usage === 1 ? WebInspector.UIString("%d glyph", usage) : WebInspector.UIString("%d glyphs", usage);
        }
    },

    __proto__: WebInspector.SidebarPane.prototype
}
