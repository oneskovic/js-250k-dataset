/**
 * Determines the device name.
 *
 * @param type the type of PZ entity, string.
 * @param config object with optional forcedDeviceName property, overrides device name.
 * @param callback function which is called with device name as param.
 */
exports.fetchDeviceName = function(type, config, callback) {
    var os = require('os');
    // use user defined device name if given
    if (config && config.forcedDeviceName) {
        callback(config.forcedDeviceName + "_" + type);
        return;
    }
    //Get Android devices identity
    if(type === "Pzp" && (os.type().toLowerCase() === "linux") && (os.platform().toLowerCase() === "android")){
        var bridge = require("bridge");
        /* If WiFi Mac address is prefered
         * var prop = {
         * aspect: "WiFiNetwork",
         * property: "macAddress"
         * }
         */
        var prop = {
            aspect: "Device",
            property: "identity"
        };

        function onsuccess(prop_value, prop){
            callback(prop_value);
        }

        function onerror(){
            log.error("android get device name returns error");
            callback("android");
        }

        var devStatusModule = bridge.load('org.webinos.impl.DevicestatusImpl', this);
        devStatusModule.getPropertyValue(onsuccess, onerror, prop);
    } else if ((type.search("Pzp") !== -1)){
        var key, cpus = os.cpus(), id, cpu_acc = "";
        for (key = 0; key <cpus.length; key = key + 1) {
            cpu_acc += cpus[key].model; // This will create string longer depending on cores you have on your machine..
        }
        id = require("crypto").createHash("md5").update(os.hostname() + process.cwd() + Math.random()).digest("hex");
        callback(id.substring (0, 40));
    } else if(type.search("PzhP") !== -1) {
        id = require("crypto").createHash("md5").update(os.hostname() + process.cwd()).digest("hex");
        callback(id.substring (0, 40));
    } else if (type.search("Pzh") !== -1){
        callback(config.friendlyName);
    }
};
