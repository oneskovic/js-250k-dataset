/**
 * @constructor
 * @implements {WebInspector.Progress}
 * @extends {WebInspector.Object}
 */
WebInspector.ProgressIndicator = function()
{
    this.element = document.createElementWithClass("div", "progress-bar-container");
    this._labelElement = this.element.createChild("span");
    this._progressElement = this.element.createChild("progress");
    this._stopButton = new WebInspector.StatusBarButton(WebInspector.UIString("Cancel"), "progress-bar-stop-button");
    this._stopButton.addEventListener("click", this.cancel, this);
    this.element.appendChild(this._stopButton.element);
    this._isCanceled = false;
    this._worked = 0;
}

WebInspector.ProgressIndicator.prototype = {
    /**
     * @param {!Element} parent
     */
    show: function(parent)
    {
        parent.appendChild(this.element);
    },

    hide: function()
    {
        var parent = this.element.parentElement;
        if (parent)
            parent.removeChild(this.element);
    },

    done: function()
    {
        if (this._isDone)
            return;
        this._isDone = true;
        this.hide();
        this.dispatchEventToListeners(WebInspector.Progress.Events.Done);
    },

    cancel: function()
    {
        this._isCanceled = true;
        this.dispatchEventToListeners(WebInspector.Progress.Events.Canceled);
    },

    /**
     * @return {boolean}
     */
    isCanceled: function()
    {
        return this._isCanceled;
    },

    /**
     * @param {string} title
     */
    setTitle: function(title)
    {
        this._labelElement.textContent = title;
    },

    /**
     * @param {number} totalWork
     */
    setTotalWork: function(totalWork)
    {
        this._progressElement.max = totalWork;
    },

    /**
     * @param {number} worked
     * @param {string=} title
     */
    setWorked: function(worked, title)
    {
        this._worked = worked;
        this._progressElement.value = worked;
        if (title)
            this.setTitle(title);
    },

    /**
     * @param {number=} worked
     */
    worked: function(worked)
    {
        this.setWorked(this._worked + (worked || 1));
    },

    __proto__: WebInspector.Object.prototype
}
