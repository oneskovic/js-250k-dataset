(function () {
    'use strict';

    var driverId = null;
    var registerFunc = null;
    var callbackFunc = null;
    var androidModule = null;
    
    var sensors = {};

    exports.init = function(dId, regFunc, cbkFunc) {
        driverId = dId;
        registerFunc = regFunc;
        callbackFunc = cbkFunc;
        if(process.platform=='android') {
            androidModule = require('bridge').load('org.webinos.impl.SensorManagerImpl', this);
            
            var foundSensors = androidModule.findSensors();
            androidModule.log('found ' + foundSensors.length + ' sensors');
            for (var i = 0; i < foundSensors.length; i++) {
                var sensor = foundSensors[i];
                var regSensorData = {};
                regSensorData.type = sensor.type;
                regSensorData.name = sensor.name;
                regSensorData.description = sensor.description;
                regSensorData.maximumRange = sensor.maximumRange;
                regSensorData.minDelay = sensor.minDelay;
                regSensorData.power = sensor.power;
                regSensorData.resolution = sensor.resolution;
                regSensorData.vendor = sensor.vendor;
                regSensorData.version = sensor.version;
                androidModule.log('registering sensor ' + JSON.stringify(regSensorData));
                var sensorId = regFunc(driverId, 0, regSensorData);
                androidModule.log('registered sensor id=' + sensorId);
                sensors[sensorId] = sensor;
            }   
        }
    };

    exports.execute = function(cmd, eId, data, errorCB) {
        switch(cmd) {
            case 'cfg':
                var sensor = sensors[eId];
                if (sensor != 'undefined' && sensor != null) {
                    try {
                        sensor.configure(data);
                    } catch (err) {
                        errorCB('Could not configure sensor: ' + err);
                    }
                }
                break;
            case 'start':
                var sensor = sensors[eId];
                if (sensor != 'undefined' && sensor != null) {
                    sensor.start(function(sensorEvent) {
                        callbackFunc('data', eId, sensorEvent.values);
                    });
                }
                break;
            case 'stop':
                var sensor = sensors[eId];
                if (sensor != 'undefined' && sensor != null) {
                    sensor.stop();
                }
                break;
            case 'value':
                errorCB('Not supported');
                break;
            default:
                console.log('Android driver - unrecognized cmd');
        }
    };
}());
