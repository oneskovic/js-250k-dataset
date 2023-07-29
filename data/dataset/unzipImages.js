var utils = require("../../uki-core/utils"),
    FB = require("../../lib/connect").FB,
    Img = require("../model/image").Image;

function unzip(account_id, file, callback) {
  var reader = new global.FileReader();
  reader.onloadend = function(e) {
    var bytes = reader.result.split(',')[1];
    FB.api(
      '/act_' + account_id + '/adimages',
      'post',
      { zipbytes: bytes },
      function(result) {
        if (result.images) {
          var newImages = [];
          utils.forEach(result.images, function(imgData) {
            var image = new Img();
            image
              .id(imgData.hash)
              .url(imgData.url)
              .account_id(account_id);
            newImages.push(image);
          });
          Img.addImages(account_id, newImages, function() {
            callback(result);
          });
        } else {
          callback(result);
        }
      });
  };
  reader.readAsDataURL(file);
}

exports.unzip = unzip;
