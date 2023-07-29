WebInspector.ExecutionContextList = function()
{
    WebInspector.Object.call(this);

    this._contexts = [];
    this._pageExecutionContext = null;
};

WebInspector.ExecutionContextList.prototype = {
    constructor: WebInspector.ExecutionContextList,

    // Public

    get pageExecutionContext()
    {
        return this._pageExecutionContext;
    },

    get contexts()
    {
        return this._contexts;
    },

    add: function(context)
    {
        // FIXME: The backend sends duplicate page context execution contexts with the same id. Why?
        if (context.isPageContext && this._pageExecutionContext) {
            console.assert(context.id === this._pageExecutionContext.id);
            return false;
        }

        this._contexts.push(context);

        if (context.isPageContext) {
            console.assert(!this._pageExecutionContext);
            this._pageExecutionContext = context;
            return true;
        }

        return false;
    },

    clear: function()
    {
        this._contexts = [];
        this._pageExecutionContext = null;
    }
};

WebInspector.ExecutionContextList.prototype.__proto__ = WebInspector.Object.prototype;
