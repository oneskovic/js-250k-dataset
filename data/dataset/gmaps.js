(function () {
    var gMaps, _,
        __slice = [].slice;


    _ = require('underscore');

    gMaps = (function () {
        function gMaps() {
        }

        gMaps.distanceFrom = function (currentPosition, listTaxi, distanceRadius, filter) {
            var latUser = currentPosition.lat;
            var radianLatUser = latUser * ( Math.PI / 180 );
            var lngUser = currentPosition.lng;
            var radianLngUser = lngUser * ( Math.PI / 180 );
            var listTaxiNearest = {};


            for (var property in listTaxi) {
                if (listTaxi[property].status == 0 && listTaxi[property].seatNum == filter) {

                    // setup our variables

                    var latTaxi = listTaxi[property].lat;
                    var radianLatTaxi = latTaxi * ( Math.PI / 180 );
                    var lngTaxi = listTaxi[property].lng;
                    var radianLngTaxi = lngTaxi * ( Math.PI / 180 );

                    // sort out the radius, MILES or KM
                    var earth_radius = 3959; // (km = 6378.1) OR (miles = 3959) - radius of the earth

                    // sort our the differences
                    var diffLat = ( radianLatTaxi - radianLatUser );
                    var diffLng = ( radianLngTaxi - radianLngUser );
                    // put on a wave (hey the earth is round after all)
                    var sinLat = Math.sin(diffLat / 2);
                    var sinLng = Math.sin(diffLng / 2);

                    // maths - borrowed from http://www.opensourceconnections.com/wp-content/uploads/2009/02/clientsidehaversinecalculation.html
                    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLatTaxi) * Math.cos(radianLatUser) * Math.pow(sinLng, 2.0);

                    // work out the distance
                    var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

                    var miledistance = distance.toFixed(1);
                    var kmdistance = (miledistance * 1.609344).toFixed(1);
                    //console.log(property, distance.toFixed(1), a);
                    if (kmdistance <= distanceRadius) {
                        listTaxiNearest[property] = listTaxi[property];
                        listTaxiNearest[property].distance = kmdistance;
                    }
                }
            }
            if (_.size(listTaxiNearest) > 0) {
                //console.log('listTaxiNearest', listTaxiNearest);
                return listTaxiNearest;
            } else {
                distanceRadius += 1;
                //console.log('distanceRadius', distanceRadius);
                if (distanceRadius == 20) {
                  //  console.log('distanceRadius == 5');
                    return listTaxiNearest;
                }
                gMaps.distanceFrom(currentPosition, listTaxi, distanceRadius, filter);
            }


            // return the distance
        };


        return gMaps;

    })();

    exports.gMaps = gMaps;

}).call(this);

//# sourceMappingURL=utils.map
