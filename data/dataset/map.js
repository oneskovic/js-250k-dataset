var wpd = wpd || {};

wpd.MapAxes = (function () {
    var AxesObj = function () {
        var isCalibrated = false,
            scaleLength,
            scaleUnits,
            dist,
            processCalibration = function(cal, scale_length, scale_units) {
                var cp0 = cal.getPoint(0),
                    cp1 = cal.getPoint(1);
                dist = Math.sqrt((cp0.px-cp1.px)*(cp0.px-cp1.px) + (cp0.py-cp1.py)*(cp0.py-cp1.py));
                scaleLength = parseFloat(scale_length);
                scaleUnits = scale_units;
                return true;
            };

        this.isCalibrated = function() {
            return isCalibrated;
        };

        this.calibrate = function (calib, scale_length, scale_units) {
            isCalibrated = processCalibration(calib, scale_length, scale_units);
            return isCalibrated;
        };

        this.pixelToData = function(pxi, pyi) {
            var data = [];
            data[0] = pxi*scaleLength/dist;
            data[1] = pyi*scaleLength/dist;
            return data;
        };

        this.pixelToDataDistance = function(distancePx) {
            return distancePx*scaleLength/dist;
        };

        this.pixelToDataArea = function (areaPx) {
            return areaPx*scaleLength*scaleLength/(dist*dist);
        };

        this.dataToPixel = function(a, b, c) {
            return {
                x: 0,
                y: 0
            };
        };

        this.pixelToLiveString = function (pxi, pyi) {
            var dataVal = this.pixelToData(pxi, pyi);
            return dataVal[0].toExponential(4) + ', ' + dataVal[1].toExponential(4);
        };

        this.getScaleLength = function () {
            return scaleLength;
        };

        this.getUnits = function () {
            return scaleUnits;
        };

        this.getTransformationEquations = function () {
            return {
                pixelToData:[
                                'x_data = ' + scaleLength/dist + '*x_pixel',
                                'y_data = ' + scaleLength/dist + '*y_pixel'
                            ],
                dataToPixel:[
                                'x_pixel = ' + dist/scaleLength + '*x_data', 
                                'y_pixel = ' + dist/scaleLength + '*y_data'
                            ]
            };
        };
    };

    AxesObj.prototype.numCalibrationPointsRequired = function() {
        return 2;
    };

    AxesObj.prototype.getDimensions = function() {
        return 2;
    };

    AxesObj.prototype.getAxesLabels = function() {
        return ['X', 'Y'];
    }; 

    return AxesObj;
})();


