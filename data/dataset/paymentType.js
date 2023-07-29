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

    it('is testing /paymenttypes', function (done) {
        app.request().get("/paymenttypes").end(function (res) {
            var resData = res.bodyJSON();
            debugOther(res.bodyJSON());
            should(resData.statusCode).equal(config.statusCode.STATUS_OK);
            done();
        });
    });

    it('is testing /paymenttype/insertion', function (done) {
        app.request()
           .post("/paymenttype/insertion")
           .setBody({ ptName : '预付'})
           .end(function (res) {
            var resData = res.bodyJSON();
            debugOther(res.bodyJSON());
            should(resData.statusCode).equal(config.statusCode.STATUS_OK);
            done();
        });
    });

    it('is testing /paymenttype/modification', function (done) {
        app.request()
           .post("/paymenttype/modification")
           .setBody({ ptId : '123' ,ptName : '已付'})
           .end(function (res) {
            var resData = res.bodyJSON();
            debugOther(res.bodyJSON());
            should(resData.statusCode).equal(config.statusCode.STATUS_OK);
            done();
        });
    });

});
