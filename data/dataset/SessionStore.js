"use strict";

var Class = require('capsela-util').Class;
var EventEmitter = require('events').EventEmitter;
var Q = require('q');
var Session = require('./Session').Session;

var SessionStore = Class.extend(
    /** @lends SessionStore */ {

    mixin: EventEmitter
},
/** @lends SessionStore# */ {
    ////////////////////////////////////////////////////////////////////////////
    /**
     * A basic in-memory session store
     * 
     * @constructs
     */
    init: function(config) {
        this.sessions = {};
    },

    ////////////////////////////////////////////////////////////////////////////
    /**
     * Returns a promise for the session having the given ID.
     *
     * @param id    the session id
     *
     * @return promise
     */
    load: function(id) {
        return Q.resolve(this.sessions[id]);
    },

    ////////////////////////////////////////////////////////////////////////////
    /**
     * Saves the given session and returns a completion promise.
     *
     * @param session
     *
     * @return promise
     */
    save: function(session) {
        session.touch();
        session.store = this;
        this.sessions[session.getId()] = session;
        return Q.resolve(session);
    },

    ////////////////////////////////////////////////////////////////////////////
    /**
     * Destroys the given session.
     *
     * @param session
     *
     * @return promise  completion promise
     */
    destroy: function(session) {
        delete this.sessions[session.getId()];
        return Q.resolve();
    },

    ////////////////////////////////////////////////////////////////////////////
    /**
     * Go through the sessions and clean up any that have timed out.
     *
     * @param timeout
     *
     * @return promise  completion promise
     */
    cleanup: function(timeout) {

        for (var id in this.sessions) {

            // see if the session is too old
            if (!this.sessions[id].stillValid()) {
                delete this.sessions[id];
            }
        }

        return Q.resolve();
    }
});

exports.SessionStore = SessionStore;

