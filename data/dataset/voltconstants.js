/**
 * Message object constants used only when encoding/decoding a message
 * between the client and server.
 * 
 */
var MESSAGE_TYPE = {
  UNDEFINED : -1,
  LOGIN : 1,
  QUERY : 2
};

var PRESENT = {
  STATUS : 0x20,
  EXCEPTION : 0x40,
  APP_STATUS : 0x80
};


/**
 * Top level event types for all operations. All events have at least the 
 * SESSION_EVENT type and STATUS_CODE.
 *  CONNECT: A successful connection to the volt server
 *  CONNECTION_ERROR: Could not connect, see both the status code and 
 *    the event handler's message parameter. 
 *  QUERY_RESPONSE: Query executed and returned
 *  QUERY_ALLOWED: Indicates that the application may execute another query.
 *    Note that this prevents your application from flooding the database and
 *    the application's code from blocking.
 *  QUERY_RESPONSE_ERROR: The query was successfully dispatched but the
 *    VoltDB server either had a critical fault or lost the connection.
 *  QUERY_DISPATCH_ERROR: The client could not dispatch the query.
 *  FATAL_ERROR: A critical error occurred that was above and beyond all 
 *    other error conditions.
 */
var SESSION_EVENT = {
  CONNECTION : 'CONNECT',
  CONNECTION_ERROR: 'CONNECT_ERROR',
  QUERY_RESPONSE: 'QUERY_RESPONSE',
  QUERY_ALLOWED: 'QUERY_ALLOWED',
  QUERY_RESPONSE_ERROR: 'QUERY_RESPONSE_ERROR',
  QUERY_DISPATCH_ERROR: 'QUERY_DISPATCH_ERROR',
  FATAL_ERROR: 'FATAL_ERROR'
}

/**
 * Each SESSION_EVENT has a STATUS_CODE giving some indication why the 
 * operation failed.
 * 
 *  SUCCESS: Operation succeeded. 
 *  USER_ABORT: The user's stored procedure intentionally threw an exception 
 *    of type UserAbortException
 *  GRACEFUL_FAILURE: Query had an error that rolled back the transaction.
 *  UNEXPECTED_FAILURE: Query had an error, rolled back the transaction 
 *    and caused additional errors.
 *  CONNECTION_LOST: The connection to VoltDB was lost before 
 *    the query returned. This is not issued by the server, but is issued 
 *    by the client.'
 *  SERVER_UNAVAILABLE: Attempted to use an invalid connection.
 *  CONNECTION_TIMEOUT: The server stopped replying.
 *  QUERY_TIMEOUT: The server issues a message saying that the query took 
 *    too long to execute.
 *  QUERY_TOOK_TOO_LONG: Driver issued message indicating that the server
 *    has taken too long to respond.
 */
var STATUS_CODES = {
  SUCCESS : null,
  USER_ABORT : -1,
  GRACEFUL_FAILURE : -2,
  UNEXPECTED_FAILURE : -3,
  CONNECTION_LOST : -4,
  SERVER_UNAVAILABLE : -5,
  CONNECTION_TIMEOUT : -6,
  QUERY_TIMEOUT : -7,
  QUERY_TOOK_TOO_LONG : -8
};

var STATUS_CODE_STRINGS = {
  1 : 'SUCCESS',
  '-1' : 'USER_ABORT',
  '-2' : 'GRACEFUL_FAILURE',
  '-3' : 'UNEXPECTED_FAILURE',
  '-4' : 'CONNECTION_LOST',
  '-5' : 'SERVER_UNAVAILABLE',
  '-6' : 'CONNECTION_LOST',
  '-7' : 'QUERY_TIMEOUT',
  '-8' : 'QUERY_TOOK_TOO_LONG'
};

var LOGIN_ERRORS = {
  1 : 'Too many connections',
  2 : 'Authentication failed, client took too long to transmit credentials',
  3 : 'Corrupt or invalid login message'
};

exports.PRESENT = PRESENT;
exports.LOGIN_ERRORS = LOGIN_ERRORS;
exports.SESSION_EVENT = SESSION_EVENT;
exports.STATUS_CODE_STRINGS = STATUS_CODE_STRINGS;
exports.STATUS_CODES = STATUS_CODES;
exports.MESSAGE_TYPE = MESSAGE_TYPE;