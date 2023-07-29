/**
 * @constructor
 * @param {WebInspector.Workspace} workspace
 * @param {WebInspector.SimpleWorkspaceProvider} networkWorkspaceProvider
 */
WebInspector.DebuggerScriptMapping = function(workspace, networkWorkspaceProvider)
{
    this._defaultMapping = new WebInspector.DefaultScriptMapping(workspace);
    this._resourceMapping = new WebInspector.ResourceScriptMapping(workspace);
    this._compilerMapping = new WebInspector.CompilerScriptMapping(workspace, networkWorkspaceProvider);
    this._snippetMapping = WebInspector.scriptSnippetModel.scriptMapping;

    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ParsedScriptSource, this._parsedScriptSource, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.FailedToParseScriptSource, this._parsedScriptSource, this);
}

WebInspector.DebuggerScriptMapping.prototype = {
    /**
     * @param {WebInspector.Event} event
     */
    _parsedScriptSource: function(event)
    {
        var script = /** @type {WebInspector.Script} */ (event.data);
        this._defaultMapping.addScript(script);

        if (WebInspector.experimentsSettings.snippetsSupport.isEnabled() && script.isSnippet()) {
            this._snippetMapping.addScript(script);
            return;
        }

        this._resourceMapping.addScript(script);

        if (WebInspector.settings.sourceMapsEnabled.get())
            this._compilerMapping.addScript(script);
    }
}
