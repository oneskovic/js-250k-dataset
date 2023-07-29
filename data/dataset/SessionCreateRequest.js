define([
  '../MessageRequest',
  'opjs-primitives/util'
], function (MessageRequest, util) {
  'use strict';

  function SessionCreateRequest() {
    this.finderID = undefined;
    this.locationInfo = undefined;
    this.peerFiles = undefined;
  }

  return SessionCreateRequest;

});
