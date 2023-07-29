WebInspector.DashboardView = function(representedObject, identifier)
{
    // Creating a new DashboardView directly returns an instance of the proper subclass.
    if (this.constructor === WebInspector.DashboardView) {
        console.assert(representedObject);

        if (representedObject instanceof WebInspector.DefaultDashboard)
            return new WebInspector.DefaultDashboardView(representedObject);

        if (representedObject instanceof WebInspector.DebuggerDashboard)
            return new WebInspector.DebuggerDashboardView(representedObject);

        throw "Can't make a DashboardView for an unknown representedObject.";
    }

    // Otherwise, a subclass is calling the base constructor.
    console.assert(this.constructor !== WebInspector.DashboardView && this instanceof WebInspector.DashboardView);
    console.assert(identifier);

    WebInspector.Object.call(this);

    this._representedObject = representedObject;

    this._element = document.createElement("div");
    this._element.classList.add(WebInspector.DashboardView.StyleClassName);
    this._element.classList.add(identifier);
};

WebInspector.DashboardView.StyleClassName = "dashboard";

WebInspector.DashboardView.prototype = {
    constructor: WebInspector.DashboardView,
    __proto__: WebInspector.Object.prototype,

    // Public

    get element()
    {
        return this._element;
    },

    get representedObject()
    {
        return this._representedObject;
    },

    shown: function()
    {
        // Implemented by subclasses.
    },

    hidden: function()
    {
        // Implemented by subclasses.
    },

    closed: function()
    {
        // Implemented by subclasses.
    }
};
