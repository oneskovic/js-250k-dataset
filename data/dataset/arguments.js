module.exports = function() {
    // cast arguments to Array
    var inputArgs = Array.prototype.slice.call(arguments);

    // default arguments
    var outputArgs = {
        path: undefined,
        options: {},
        callback: function(e, data) {}
    };

    // path argument
    if (typeof inputArgs[0] === 'string') {
        outputArgs.path = inputArgs.shift();
    }

    // options argument
    if (typeof inputArgs[0] === 'object') {
        outputArgs.options = inputArgs.shift();
    }

    // callback argument
    if (typeof inputArgs[0] === 'function') {
        outputArgs.callback = inputArgs.shift();
    }

    // require path argument
    if (typeof outputArgs.path !== 'string') {
        throw new Error('Path is missing');
    }

    // in path, replace :placeholders with variables
    //while(args[0] && typeof args[0] !== 'function') {
    //    var value = args.shift().toString();
    //    output.path = output.path.replace(/:\w+/, value);
    //}

    // trim whitespace and slashes
    outputArgs.path = '/' + outputArgs.path.replace(/^[\/ ]*/, '').replace(/[\/ ]*$/, '');

    return outputArgs;
};
