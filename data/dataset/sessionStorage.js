module.exports = function sessionStorage (method, args) {

    // set default options
    var data = {},
        requestOptions = {
            path: '/session/:sessionId/session_storage',
            method: typeof method === 'string' ? method.toUpperCase() : 'GET'
        };

    if(requestOptions.method === 'POST' && typeof args === 'object') {
        data = {
            key: args.key,
            value: args.value
        };
    }

    // add/delete specific key
    if((requestOptions.method === 'DELETE' && typeof args === 'string') ||
       (requestOptions.method === 'GET'    && typeof args === 'string')) {
        requestOptions.path += '/key/' + args;
    }

    // create request
    this.requestHandler.create(requestOptions, data, arguments[arguments.length - 1]);

};