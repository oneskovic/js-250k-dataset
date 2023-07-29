;(function($, window, document, undefined) {
	'use strict';

    $.jribbble = {};

    var jsonpGET = function (path, args) {
        $.ajax({
            type: 'GET',
            url: 'http://api.dribbble.com' + path,
            data: args[1] || {},
            dataType: 'jsonp',
            success: function (data) {
                if (typeof (data) === 'undefined') {
                    args[0]({error: true});
                }
                else {
                    args[0](data);
                }
            }
        });
    };

    var methods = {
        'getShotById': '/shots/$/',
        'getReboundsOfShot': '/shots/$/rebounds/',
        'getShotsByList': '/shots/$/',
        'getShotsByPlayerId': '/players/$/shots/',
        'getShotsThatPlayerFollows': '/players/$/shots/following/',
        'getPlayerById': '/players/$/',
        'getPlayerFollowers': '/players/$/followers/',
        'getPlayerFollowing': '/players/$/following/',
        'getPlayerDraftees': '/players/$/draftees/',
        'getCommentsOfShot': '/shots/$/comments/',
        'getShotsThatPlayerLikes': '/players/$/shots/likes/'
    };

    var createAPIMethod = function (urlPattern) {
        return function () {
            var // Convert arguments to a real Array
                args = [].slice.call(arguments),

                // We run shift() on args here because we don't need to send
                // the first argument to jsonpGET.
                url = urlPattern.replace('$', args.shift());

            jsonpGET(url, args);
        };
    };

    for (var method in methods) {
        $.jribbble[method] = createAPIMethod(methods[method]);
    }

})(jQuery, window , document);