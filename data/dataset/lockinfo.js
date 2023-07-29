"use strict";

var Base = require("./../../../shared/base");

/**
 * LockInfo class
 *
 * An object of the LockInfo class holds all the information relevant to a
 * single lock.
 */
var jsDAV_Locks_LockInfo = module.exports = Base.extend({
    /**
     * A shared lock
     */
    SHARED: 1,

    /**
     * An exclusive lock
     */
    EXCLUSIVE: 2,

    /**
     * A never expiring timeout
     */
    TIMEOUT_INFINITE: -1,

    /**
     * The owner of the lock
     *
     * @var string
     */
    owner: null,

    /**
     * The locktoken
     *
     * @var string
     */
    token: null,

    /**
     * How long till the lock is expiring, in seconds
     *
     * @var int
     */
    timeout: null,

    /**
     * UNIX Timestamp of when this lock was created
     *
     * @var int
     */
    created: null,

    /**
     * Exclusive or shared lock
     *
     * @var int
     */
    scope: 2,

    /**
     * Depth of lock, can be 0 or jsDAV_Server.DEPTH_INFINITY
     */
    depth: 0,

    /**
     * The uri this lock locks
     *
     * @todo: This value is not always set
     */
    uri: null
});
