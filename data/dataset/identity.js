describe("webworks identity", function () {
    var identity = require('ripple/platform/webworks.tablet/2.0.0/server/identity'),
        deviceSpec = require('ripple/platform/webworks.handset/2.0.0/spec/device'),
        transport = require('ripple/platform/webworks.core/2.0.0/client/transport'),
        identityClient = require('ripple/platform/webworks.tablet/2.0.0/client/identity'),
        deviceSettings = require('ripple/deviceSettings'),
        spec = require('ripple/platform/webworks.tablet/2.0.0/spec'),
        webworks = require('ripple/platform/webworks.tablet/2.0.0/server');

    describe("using server", function () {
        it("exposes the identity module", function () {
            expect(webworks.blackberry.identity).toEqual(identity);
        });
    });

    describe("in spec", function () {
        it("includes identity module according to proper object structure", function () {
            expect(spec.objects.blackberry.children.identity.path)
                .toEqual("webworks.tablet/2.0.0/client/identity");
        });
    });

    describe("using client/identity", function () {
        describe("PIN", function () {
            it("calls the transport", function () {
                spyOn(transport, "call").andReturn("takes all");
                expect(identityClient.PIN).toEqual("takes all");
                expect(transport.call).toHaveBeenCalledWith("blackberry/identity/PIN");
            });
        });
    });

    describe("using server/identity", function () {
        describe("PIN", function () {
            it("has a correlative device setting", function () {
                expect(typeof deviceSpec.identity.PIN).toEqual("object");
                expect(typeof deviceSpec.identity.PIN.name).toEqual("string");
                expect(deviceSpec.identity.PIN.control.type).toEqual("text");
                expect(typeof deviceSpec.identity.PIN.control.value).toEqual("string");
            });

            it("returns a persisted device setting", function () {
                spyOn(deviceSettings, "retrieve").andReturn("wine");
                expect(identity.PIN().data).toEqual("wine");
            });
        });
    });
});
