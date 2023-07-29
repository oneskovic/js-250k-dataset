WebInspector.CSSObserver = function()
{
    WebInspector.Object.call(this);
};

WebInspector.CSSObserver.prototype = {
    constructor: WebInspector.CSSObserver,

    // Events defined by the "CSS" domain.

    mediaQueryResultChanged: function()
    {
        WebInspector.cssStyleManager.mediaQueryResultChanged();
    },

    styleSheetChanged: function(styleSheetId)
    {
        WebInspector.cssStyleManager.styleSheetChanged(styleSheetId);
    },

    styleSheetAdded: function(header)
    {
        // FIXME: Not implemented. <rdar://problem/13213680>
    },

    styleSheetRemoved: function(header)
    {
        // FIXME: Not implemented. <rdar://problem/13213680>
    },

    namedFlowCreated: function(namedFlow)
    {
        WebInspector.domTreeManager.namedFlowCreated(namedFlow);
    },

    namedFlowRemoved: function(documentNodeId, flowName)
    {
        WebInspector.domTreeManager.namedFlowRemoved(documentNodeId, flowName);
    },

    // COMPATIBILITY (iOS 7): regionLayoutUpdated was removed and replaced by regionOversetChanged.
    regionLayoutUpdated: function(namedFlow)
    {
        WebInspector.domTreeManager.regionLayoutUpdated(namedFlow);
    },

    regionOversetChanged: function(namedFlow)
    {
        WebInspector.domTreeManager.regionOversetChanged(namedFlow);
    },

    registeredNamedFlowContentElement: function(documentNodeId, flowName, contentNodeId, nextContentElementNodeId)
    {
        WebInspector.domTreeManager.registeredNamedFlowContentElement(documentNodeId, flowName, contentNodeId, nextContentElementNodeId);
    },

    unregisteredNamedFlowContentElement: function(documentNodeId, flowName, contentNodeId)
    {
        WebInspector.domTreeManager.unregisteredNamedFlowContentElement(documentNodeId, flowName, contentNodeId);
    }
};

WebInspector.CSSObserver.prototype.__proto__ = WebInspector.Object.prototype;
