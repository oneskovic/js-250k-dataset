var should = require("should");
var app    = require("../../app");

describe("auth user test", function () {

    before(function (done) {
        app.listen(0, done);
    });

    after(function () {
        app.close();
    });

    //test: /authuser/create
    it('is testing func: /authuser/create', function (done) {

        var param = {
            uid   : "lzc",
            pwd   : "adminn",
            uName : "刘志成"
        };

        app.request().post('/departments').setBody(param).end(function (res) {
            console.dir(res.bodyJSON());
            done();
        });
    });

});