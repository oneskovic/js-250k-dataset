Kata.require([
    'katajs/oh/GUISimulation.js',
    '../../scripts/jquery.ui.prettypiemenu.js'
], function() {

    var SUPER = Kata.GUISimulation.prototype;

    /** Manages a chat UI on a page. Supports multiple chat windows. */
    PieUI = function(channel) {
        SUPER.constructor.call(this, channel);

    };
    Kata.extend(PieUI, SUPER);

    PieUI.prototype._destroy = function() {
        if (this.mPie) {
            try {
                $(this.mPie).hide();
            } catch (e) {
            }
            this.mPie = null;
            this.mButtons = null;
        }
    };


    PieUI.prototype._create = function(x, y, buttons) {
        this._destroy();
        this.mPie = $("<span></span>");
        this.mPie.prettypiemenu(
            {
                buttons: buttons,
                onSelection: Kata.bind(this._selected, this),
                onAbort: Kata.bind(this._aborted, this),
                showTitles: false
            });
        this.mStartX = x;
        this.mStartY = y;
        this.mButtons = buttons;
        this.mPie.prettypiemenu('show', {top: y, left: x});
    };

    PieUI.prototype._selected = function(which, elem, ev) {
        this._commit(which, ev.pageX - this.mStartX, ev.pageY - this.mStartY);
        this.mButtons = null;
        this.mPie = null;
    };

    PieUI.prototype._aborted = function(elem, ev) {
        this.mButtons = null;
        this.mPie = null;
    };

    PieUI.prototype._commit = function(which, dx, dy) {
        var button = this.mButtons[which];
        
        var event = {
            x: this.mStartX,
            y: this.mStartY,
            deltaX: dx,
            deltaY: dy,
            msg: button.msg
        };
        this.mChannel.sendMessage(
            new Kata.ScriptProtocol.ToScript.GUIMessage({
                msg: "pieaction",
                event: event
            })
        );
    };

    // GUISimulation interface
    PieUI.prototype.handleGUIMessage = function(evt) {
        if (evt.msg !== 'pie') return;
        var revt = evt.event;

        if (revt.action == 'show') {
            this._create(revt.x, revt.y, revt.buttons);
        }
        else if (revt.action == 'hide') {
            this._destroy();
        }
    };
});
