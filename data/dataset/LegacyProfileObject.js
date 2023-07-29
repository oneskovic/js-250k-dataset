WebInspector.LegacyProfileObject = function(type, title, id, isRecording)
{
    WebInspector.Object.call(this);

    console.assert(type);
    console.assert(title);
    console.assert(id);

    this._type = type;
    this._title = title;
    this._id = id;
    this._isRecording = isRecording || false;
};

WebInspector.LegacyProfileObject.Event = {
    FinshedRecording: "profile-object-finished-recording"
};

WebInspector.LegacyProfileObject.prototype = {
    constructor: WebInspector.LegacyProfileObject,
    
    get type()
    {
        return this._type;
    },

    set type(type)
    {
        this._type = type;
    },
    
    get title()
    {
        return this._title;
    },

    set title(title)
    {
        this._title = title;
    },

    get id()
    {
        return this._id;
    },

    set id(id)
    {
        this._id = id;
    },

    get recording()
    {
        return this._isRecording;
    },

    set recording(flag)
    {
        if (this._isRecording === flag)
            return;

        this._isRecording = flag;
        if (!flag)
            this.dispatchEventToListeners(WebInspector.LegacyProfileObject.Event.FinshedRecording);
    }
};

WebInspector.LegacyProfileObject.prototype.__proto__ = WebInspector.Object.prototype;
