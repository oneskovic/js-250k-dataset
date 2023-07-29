var should = require("should");
var app    = require("../../app");
var config = require("../../config").initConfig();

describe("auth user test", function () {

    before(function (done) {
        app.listen(0, done);
    });

    after(function () {
        app.close();
    });

    it('is testing /giftcategories', function (done) {
        app.request().get("/giftcategories").end(function (res) {
            var resData = res.bodyJSON();
            debugOther(res.bodyJSON());
            should(resData.statusCode).equal(config.statusCode.STATUS_OK);
            done();
        });
    });

    it('is testing /giftcategory/insertion', function (done) {
        app.request().post("/giftcategory/insertion").setBody({ name : '礼品' }).end(function (res) {
            var resData = res.bodyJSON();
            should(resData.statusCode).equal(config.statusCode.STATUS_OK);
            done();
        });
    });

    it('is testing /giftcategory/modification', function (done) {
        app.request()
            .post("/giftcategory/modification")
            .setBody({ categoryId : "12345", name : "礼品"})
            .end( function (res) {
                var resData = res.bodyJSON();
                should(resData.statusCode).equal(config.statusCode.STATUS_OK);
                done();
        });
    });

});

