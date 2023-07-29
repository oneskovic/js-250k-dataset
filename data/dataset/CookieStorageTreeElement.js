WebInspector.CookieStorageTreeElement = function(representedObject)
{
    console.assert(representedObject instanceof WebInspector.CookieStorageObject);
    
    WebInspector.StorageTreeElement.call(this, WebInspector.CookieStorageTreeElement.CookieIconStyleClassName, WebInspector.displayNameForHost(representedObject.host), representedObject);
};

WebInspector.CookieStorageTreeElement.CookieIconStyleClassName = "cookie-icon";

WebInspector.CookieStorageTreeElement.prototype = {
    constructor: WebInspector.CookieStorageTreeElement,
    
    // Public
    
    get name()
    {
        return this.representedObject.host;
    },
    
    get categoryName()
    {
        return WebInspector.UIString("Cookies");
    }
};

WebInspector.CookieStorageTreeElement.prototype.__proto__ = WebInspector.StorageTreeElement.prototype;
