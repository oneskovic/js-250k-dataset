var _send = document.getElementById("bus-send"),
    _receive = document.getElementById("bus-receive"),
    _evt = document.createEvent("Events");

_evt.initEvent('bus-init', true, true);
document.dispatchEvent(_evt);

module.exports = {
    send: function (msg, data, callback) {
        var m = document.createElement("span");
        m.dataset.msg = msg;
        m.innerHTML = JSON.stringify(data);

        if (callback) {
            m.dataset.callback = Math.uuid();
            this.receive(m.dataset.callback, callback);
        }

        _send.appendChild(m);
    },

    receive: function (msg, handler) {
        if (!handler) {
            return;
        }

        _receive.addEventListener("DOMNodeInserted", function (evt) {
            if (evt.target.dataset.msg === msg) {
                handler(JSON.parse(evt.target.innerHTML));
            }
        });
    },

    ajax: function (method, url, data, success, fail) {
        this.send("xhr", {
            method: method,
            url: url,
            data: data
        }, function (result) {
            if (result.code === 200) {
                success(result.data);
            }
            else {
                fail(result);
            }
        });
    }
};
