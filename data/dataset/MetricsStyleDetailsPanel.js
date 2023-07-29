WebInspector.MetricsStyleDetailsPanel = function()
{
    WebInspector.StyleDetailsPanel.call(this, WebInspector.MetricsStyleDetailsPanel.StyleClassName, "metrics", WebInspector.UIString("Metrics"));

    this._boxModelDiagramRow = new WebInspector.BoxModelDetailsSectionRow;

    var boxModelGroup = new WebInspector.DetailsSectionGroup([this._boxModelDiagramRow]);
    var boxModelSection = new WebInspector.DetailsSection("style-box-model", WebInspector.UIString("Box Model"), [boxModelGroup]);

    this.element.appendChild(boxModelSection.element);
};

WebInspector.MetricsStyleDetailsPanel.StyleClassName = "metrics";

WebInspector.MetricsStyleDetailsPanel.prototype = {
    constructor: WebInspector.MetricsStyleDetailsPanel,

    // Public

    refresh: function()
    {
        this._boxModelDiagramRow.nodeStyles = this.nodeStyles;
    }
};

WebInspector.MetricsStyleDetailsPanel.prototype.__proto__ = WebInspector.StyleDetailsPanel.prototype;
