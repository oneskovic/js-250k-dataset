WebInspector.LegacyProfileView = function(profile, settingId)
{
    WebInspector.ContentView.call(this, profile);

    this._profile = profile;

    this.element.classList.add("profile-view");

    this.showTimeAsPercent = new WebInspector.Setting(settingId, true);
    this.showTimeAsPercentNavigationItem = new WebInspector.ActivateButtonNavigationItem("selector-profiler-show-time-as-percent-navigation-item", WebInspector.UIString("Show times as percentages"), WebInspector.UIString("Show times as absolute times"), "Images/Percent.svg", 16, 16);
    this.showTimeAsPercentNavigationItem.addEventListener(WebInspector.ButtonNavigationItem.Event.Clicked, this.toggleTimeDisplay, this);
    this.showTimeAsPercentNavigationItem.activated = this.showTimeAsPercent.value;

    if (profile.recording) {
        this._showRecordingMessage();
        profile.addEventListener(WebInspector.LegacyProfileObject.Event.FinshedRecording, this._profileFinishedRecording, this);
    } else
        this.displayProfile();
};

WebInspector.LegacyProfileView.prototype = {
    constructor: WebInspector.LegacyProfileView,

    // Public

    get navigationItems()
    {
        return [this.showTimeAsPercentNavigationItem];
    },

    get allowedNavigationSidebarPanels()
    {
        return ["instrument"];
    },

    get profile()
    {
        return this._profile;
    },

    set profile(profile)
    {
        this._profile = profile;
    },
    
    toggleTimeDisplay: function(event)
    {
        this.showTimeAsPercentNavigationItem.activated = !this.showTimeAsPercentNavigationItem.activated;
    },

    displayProfile: function()
    {
        // Implemented by subclasses.
    },

    get recordingTitle()
    {
        return WebInspector.UIString("Recording\u2026");
    },
    
    // Private
    
    _profileFinishedRecording: function()
    {
        this._hideRecordingMessage();
        this.displayProfile();
    },
    
    _showRecordingMessage: function()
    {
        this._recordingMessageContainer = this.element.appendChild(document.createElement("div"));
        this._recordingMessageContainer.className = "recording-profile-view";
        this._recordingMessageContainer.appendChild(new WebInspector.IndeterminateProgressSpinner().element);
        this._recordingMessageContainer.appendChild(document.createElement("span")).textContent = this.recordingTitle;
    },
    
    _hideRecordingMessage: function()
    {
        if (this._recordingMessageContainer)
            this._recordingMessageContainer.remove();
    }
};

WebInspector.LegacyProfileView.prototype.__proto__ = WebInspector.ContentView.prototype;
