MediaPlayer.models.MetricsList = function () {
    "use strict";

    return {
        TcpList: [],
        HttpList: [],
        RepSwitchList: [],
        BufferLevel: [],
        BufferState: [],
        PlayList: [],
        DroppedFrames: [],
        SchedulingInfo: [],
        DVRInfo: [],
        ManifestUpdate: []
    };
};

MediaPlayer.models.MetricsList.prototype = {
    constructor: MediaPlayer.models.MetricsList
};