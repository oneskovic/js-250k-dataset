function EditorSettings(data) 
{
    var _data;

    this.load = function(onSuccess, onError)
    {
        JSONRPCClient.call('load-editor-settings', 
                        {},
                        function(data){
                            _data = data;
                            onSuccess(data)
                        }, onError);
    }

    this.save = function(onSuccess, onError)
    {
        console.log("Saving editor settings");
        JSONRPCClient.call('save-editor-settings',
                        {
                            data: _data,
                             clientUUID: CLIENT_UUID
                        },
                        onSuccess,
                        onError);
    }

    this.update = function(editorSettings)
    {
        _data = editorSettings;
    }

    this.getData = function()
    {
        return _data;
    }
}
