WebInspector.NetworkObserver = function()
{
    WebInspector.Object.call(this);
};

WebInspector.NetworkObserver.prototype = {
    constructor: WebInspector.NetworkObserver,

    // Events defined by the "Network" domain.

    requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, redirectResponse, type)
    {
        WebInspector.frameResourceManager.resourceRequestWillBeSent(requestId, frameId, loaderId, request, type, redirectResponse, timestamp, initiator);
    },

    requestServedFromCache: function(requestId)
    {
        WebInspector.frameResourceManager.markResourceRequestAsServedFromMemoryCache(requestId);
    },

    responseReceived: function(requestId, frameId, loaderId, timestamp, type, response)
    {
        WebInspector.frameResourceManager.resourceRequestDidReceiveResponse(requestId, frameId, loaderId, type, response, timestamp);
    },

    dataReceived: function(requestId, timestamp, dataLength, encodedDataLength)
    {
        WebInspector.frameResourceManager.resourceRequestDidReceiveData(requestId, dataLength, encodedDataLength, timestamp);
    },

    loadingFinished: function(requestId, timestamp, sourceMapURL)
    {
        WebInspector.frameResourceManager.resourceRequestDidFinishLoading(requestId, timestamp, sourceMapURL);
    },

    loadingFailed: function(requestId, timestamp, errorText, canceled)
    {
        WebInspector.frameResourceManager.resourceRequestDidFailLoading(requestId, canceled, timestamp);
    },

    requestServedFromMemoryCache: function(requestId, frameId, loaderId, documentURL, timestamp, initiator, resource)
    {
        WebInspector.frameResourceManager.resourceRequestWasServedFromMemoryCache(requestId, frameId, loaderId, resource, timestamp, initiator);
    },

    webSocketWillSendHandshakeRequest: function(requestId, timestamp, request)
    {
        // FIXME: Not implemented.
    },

    webSocketHandshakeResponseReceived: function(requestId, timestamp, response)
    {
        // FIXME: Not implemented.
    },

    webSocketCreated: function(requestId, url)
    {
        // FIXME: Not implemented.
    },

    webSocketClosed: function(requestId, timestamp)
    {
        // FIXME: Not implemented.
    }
};

WebInspector.NetworkObserver.prototype.__proto__ = WebInspector.Object.prototype;
