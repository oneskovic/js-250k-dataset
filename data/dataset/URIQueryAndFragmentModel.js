MediaPlayer.models.URIQueryAndFragmentModel = function () {
    "use strict";

    var URIFragmentDataVO = new MediaPlayer.vo.URIFragmentData(),
        URIQueryData = [],

        reset = function () {
            URIFragmentDataVO = new MediaPlayer.vo.URIFragmentData();
            URIQueryData = [];
        },

        parseURI = function (uri) {

            var URIFragmentData = [],
                testQuery = new RegExp(/[?]/),
                testFragment = new RegExp(/[#]/),
                isQuery = testQuery.test(uri),
                isFragment = testFragment.test(uri),
                mappedArr;

            function reduceArray(previousValue, currentValue, index, array) {
                var arr =  array[0].split(/[=]/);
                array.push({key:arr[0], value:arr[1]});
                array.shift();
                return array;
            }

            function mapArray(currentValue, index, array) {
                if (index > 0)
                {
                    if (isQuery && URIQueryData.length === 0) {
                        URIQueryData = array[index].split(/[&]/);
                    } else if (isFragment) {
                        URIFragmentData = array[index].split(/[&]/);
                    }
                }

                return array;
            }

            mappedArr = uri.split(/[?#]/).map(mapArray);

            if (URIQueryData.length > 0) {
                URIQueryData = URIQueryData.reduce(reduceArray, null);
            }

            if (URIFragmentData.length > 0) {
                URIFragmentData = URIFragmentData.reduce(reduceArray, null);
                URIFragmentData.forEach(function (object) {
                    URIFragmentDataVO[object.key] = object.value;
                });
            }

            return uri;
        };

    return {
        parseURI:parseURI,
        reset:reset,
        //ORANGE: fix bug on not updating URIFragmentDataVO 
        getURIFragmentData: function() {
            return URIFragmentDataVO;
        },
        getURIQueryData:URIQueryData
    };
};

MediaPlayer.models.URIQueryAndFragmentModel.prototype = {
    constructor: MediaPlayer.models.URIQueryAndFragmentModel
};
