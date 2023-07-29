var _p = cc.inputManager;

/**
 * whether enable accelerometer event
 * @param {Boolean} isEnable
 */
_p.setAccelerometerEnabled = function(isEnable){
    var _t = this;
    if(_t._accelEnabled === isEnable)
        return;

    _t._accelEnabled = isEnable;
    var scheduler = cc.director.getScheduler();
    if(_t._accelEnabled){
        _t._accelCurTime = 0;
        scheduler.scheduleUpdateForTarget(_t);
    } else {
        _t._accelCurTime = 0;
        scheduler.unscheduleUpdateForTarget(_t);
    }
};

/**
 * set accelerometer interval value
 * @param {Number} interval
 */
_p.setAccelerometerInterval = function(interval){
    if (this._accelInterval !== interval) {
        this._accelInterval = interval;
    }
};

_p._registerKeyboardEvent = function(){
    cc._addEventListener(cc._canvas, "keydown", function (e) {
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(e.keyCode, true));
        e.stopPropagation();
        e.preventDefault();
    }, false);
    cc._addEventListener(cc._canvas, "keyup", function (e) {
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(e.keyCode, false));
        e.stopPropagation();
        e.preventDefault();
    }, false);
};

_p._registerAccelerometerEvent = function(){
    var w = window, _t = this;
    _t._acceleration = new cc.Acceleration();
    _t._accelDeviceEvent = w.DeviceMotionEvent || w.DeviceOrientationEvent;

    //TODO fix DeviceMotionEvent bug on QQ Browser version 4.1 and below.
    if (cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ)
        _t._accelDeviceEvent = window.DeviceOrientationEvent;

    var _deviceEventType = (_t._accelDeviceEvent == w.DeviceMotionEvent) ? "devicemotion" : "deviceorientation";
    var ua = navigator.userAgent;
    if (/Android/.test(ua) || (/Adr/.test(ua) && cc.sys.browserType == cc.BROWSER_TYPE_UC)) {
        _t._minus = -1;
    }

    cc._addEventListener(w, _deviceEventType, _t.didAccelerate.bind(_t), false);
};

_p.didAccelerate = function (eventData) {
    var _t = this, w = window;
    if (!_t._accelEnabled)
        return;

    var mAcceleration = _t._acceleration;
    if (_t._accelDeviceEvent == window.DeviceMotionEvent) {
        var eventAcceleration = eventData["accelerationIncludingGravity"];
        mAcceleration.x = _t._accelMinus * eventAcceleration.x * 0.1;
        mAcceleration.y = _t._accelMinus * eventAcceleration.y * 0.1;
        mAcceleration.z = eventAcceleration.z * 0.1;
    } else {
        mAcceleration.x = (eventData["gamma"] / 90) * 0.981;
        mAcceleration.y = -(eventData["beta"] / 90) * 0.981;
        mAcceleration.z = (eventData["alpha"] / 90) * 0.981;
    }
    mAcceleration.timestamp = eventData.timeStamp || Date.now();

    var tmpX = mAcceleration.x;
    if(w.orientation === cc.UIInterfaceOrientationLandscapeRight){
        mAcceleration.x = -mAcceleration.y;
        mAcceleration.y = tmpX;
    }else if(w.orientation === cc.UIInterfaceOrientationLandscapeLeft){
        mAcceleration.x = mAcceleration.y;
        mAcceleration.y = -tmpX;
    }else if(w.orientation === cc.UIInterfaceOrientationPortraitUpsideDown){
        mAcceleration.x = -mAcceleration.x;
        mAcceleration.y = -mAcceleration.y;
    }
};

delete _p;