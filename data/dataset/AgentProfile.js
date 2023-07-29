(function () {
    "use strict";

    /**
    @class TinCan.AgentProfile
    @constructor
    */
    var AgentProfile = TinCan.AgentProfile = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property agent
        @type TinCan.Agent
        */
        this.agent = null;

        /**
        @property updated
        @type String
        */
        this.updated = null;

        /**
        @property contents
        @type String
        */
        this.contents = null;

        /**
        SHA1 of contents as provided by the server during last fetch,
        this should be passed through to saveAgentProfile

        @property etag
        @type String
        */
        this.etag = null;

        /**
        @property contentType
        @type String
        */
        this.contentType = null;

        this.init(cfg);
    };
    AgentProfile.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "AgentProfile",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "contents",
                    "etag",
                    "contentType"
                ];

            cfg = cfg || {};

            if (cfg.hasOwnProperty("agent")) {
                if (cfg.agent instanceof TinCan.Agent) {
                    this.agent = cfg.agent;
                }
                else {
                    this.agent = new TinCan.Agent (cfg.agent);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            this.updated = false;
        }
    };

    /**
    @method fromJSON
    @return {Object} AgentProfile
    @static
    */
    AgentProfile.fromJSON = function (stateJSON) {
        AgentProfile.prototype.log("fromJSON");
        var _state = JSON.parse(stateJSON);

        return new AgentProfile(_state);
    };
}());
