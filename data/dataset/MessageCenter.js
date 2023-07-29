/*==============================================================================
NLW Message Center Class
 =============================================================================*/
 
{

var proto = Subclass('Wikiwyg.MessageCenter');
var klass = Wikiwyg.MessageCenter;
klass.closeTimer = null;

proto.messageCenter = jQuery('#st-message-center');
proto.messageCenterTitle = jQuery('#st-message-center-title');
proto.messageCenterBody = jQuery('#st-message-center-body');
proto.messageCenterControlClose = jQuery('#st-message-center-control-close');
proto.messageCenterControlArrow = jQuery('#st-message-center-control-arrow');
proto.closeDelayDefault = 10;

proto.display = function (args) {
    this.closeDelay = 
        (args.timeout ? args.timeout : this.closeDelayDefault) * 1000;
    this.messageCenterTitle.html(args.title);
    this.messageCenterBody.html(args.body);

    if (this.messageCenter.size()) {
        this.messageCenter.show();
        this.setCloseTimer();
        this.installEvents();
        this.installControls();
    }
};
proto.clearCloseTimer = function () {
    if (klass.closeTimer)
        window.clearTimeout(klass.closeTimer);
};
proto.setCloseTimer = function () {
    this.clearCloseTimer();
    var self = this;
    klass.closeTimer = window.setTimeout(
        function () { self.closeMessageCenter() },
        this.closeDelay
    );
};
proto.closeMessageCenter = function () {
    if (this.messageCenter.size()) {
        this.messageCenter.hide();
        this.closeMessage();
        this.clearCloseTimer();
    }
};
proto.clear = proto.closeMessageCenter;
proto.installEvents = function () {
    var self = this;
    this.messageCenter
        .mouseover(function () { self.openMessage() })
        .mouseout(function () { self.closeMessage() });
};
proto.openMessage = function () {
    this.clearCloseTimer();
    this.messageCenterControlArrow.attr(
        'src',
        this.messageCenterControlArrow.attr('src').replace(/right/, 'down')
    );
    this.messageCenterBody.show();
};
proto.closeMessage = function () {
    this.setCloseTimer();
    this.messageCenterControlArrow.attr(
        'src',
        this.messageCenterControlArrow.attr('src').replace(/down/, 'right')
    );
    this.messageCenterBody.hide();
};
proto.installControls = function () {
    var self = this;
    this.messageCenterControlClose.click(function () { self.closeMessageCenter() });
};

}
