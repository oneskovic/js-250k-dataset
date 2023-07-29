"use strict";

var fs = require('fs');
var path = require('path');

var capsela = require('../../');
var Browser = capsela.Browser;
var HttpClient = capsela.HttpClient;
var Request = capsela.Request;
var ClientResponse = capsela.ClientResponse;
var Q = require('q');
var Pipe = require('capsela-util').Pipe;
var Log = require('capsela-util').Log;
var Cookie = capsela.Cookie;

var baseTemplate =
"<!DOCTYPE html>\
<html>\
<head>\
    <title>{title}</title>\
</head>\
<body>\
{view}\
</body>\
</html>";

var UnitBrowser = Browser.extend({
},
{
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param stage the stage under test
     */
    init: function(stage) {
        this.top = new capsela.stages.ViewRenderer({}, baseTemplate);
        this.top.setNext(stage);
        this.echo(this.top);
        this._super();
    },

    ///////////////////////////////////////////////////////////////////////////////
    /**
     * Processes the given request and returns a promise for a response.
     *
     * @param request
     *
     * @return promise
     */
    clientDispatch: function(hostname, request) {

        var self = this;
        
        // you know we need this
        request.headers.host = hostname;

        // do any required preparation
        if (this.prepRequest) {
            this.prepRequest(request);
        }

        // pass log messages up
        this.echo(request);
        
        return Q.ref().then(
            function() {
                return self.top.service(request);
            }
        ).then(
            function(response) {

                if (!response) {
                    throw new Error("stage didn't return a response");
                }

                // dress the server response up as a client response
                // this gives us easy direct access to the server response
                // alternatively, we could create a real ClientResponse
                // and stash the server response on it

                var bodyStream = new Pipe();

                response.getBodyStream = function() {
                    return bodyStream;
                }

                bodyStream.pause();

                // write the response body
                response.sendBody(bodyStream);

                return response;
            }
        );
    }
});

exports.UnitBrowser = UnitBrowser;