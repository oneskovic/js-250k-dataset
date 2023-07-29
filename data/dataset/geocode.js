;(function($){
    var P = $.jHERE;

    function isFunction(fn) {
        return typeof fn === 'function';
    }

    function geocode(query, success, error, reverse) {
        var deferred = $.Deferred();
        success = isFunction(success) ? success : $.noop;
        error = isFunction(error) ? error : $.noop;
        P._JSLALoader.load().is.done(function(){
            var searchManager = nokia.places.search.manager;
            function geocodeCallback(data, status) {
                var location = data.location;
                location = reverse ? data.location.address : data.location.position;
                if(status === 'OK') {
                    deferred.resolve(location);
                    success(location);
                } else {
                    deferred.reject();
                    error();
                }
            }
            if (reverse) {
                searchManager.reverseGeoCode({
                    latitude: query.latitude || query[0],
                    longitude: query.longitude  || query[1],
                    onComplete: geocodeCallback
                });
            } else {
                searchManager.geoCode({
                    searchTerm: query,
                    onComplete: geocodeCallback
                });
            }
        });
        return deferred;
    }


    //### Geocode
    //`$.JHERE.geocode('Berlin, Germany', function(position){}, function(){/*error*/});`
    //jHERE exposes the possibility of geocoding an address
    //into (latitude, longitude). This call is asynchronous
    //and supports a `success` and a `error` callback.
    //When jHERE is used with jQuery a $.Deferred object is also returned
    //and can be used instead of callbacks. For Zepto.JS a Deferred is also returned,
    //however note that it is a custom implementation that only supports the `done` method.
    P.geocode = function(query, success, error) {
        return geocode(query, success, error);
    };

    //### Reverse Geocode
    //`$.JHERE.reverseGeocode({latitude: 52.5, longitude: 13.3}, function(address){}, function(){/*error*/});`
    //jHERE exposes the possibility of reverse geocoding a position
    //into an address. This call is asynchronous
    //and supports a `success` and a `error` callback.
    //When jHERE is used with jQuery a $.Deferred object is also returned
    //and can be used instead of callbacks. For Zepto.JS a Deferred is also returned,
    //however note that it is a custom implementation that only supports the `done` method.
    P.reverseGeocode = function(query, success, error) {
        return geocode(query, success, error, true);
    };

}(jQuery));