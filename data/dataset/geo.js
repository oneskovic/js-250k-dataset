describe("geo", function () {
    var geo = require('ripple/geo'),
        db = require('ripple/db'),
        event = require('ripple/event');

    describe("getPositionInfo", function () {
        it("returns valid values", function () {
            var positionInfo = geo.getPositionInfo();

            expect(typeof positionInfo).toEqual("object");
            expect(typeof positionInfo.latitude).toEqual("number");
            expect(typeof positionInfo.longitude).toEqual("number");
            expect(typeof positionInfo.altitude).toEqual("number");
            expect(typeof positionInfo.accuracy).toEqual("number");
            expect(typeof positionInfo.altitudeAccuracy).toEqual("number");
            expect(typeof positionInfo.heading).toEqual("number");
            expect(typeof positionInfo.speed).toEqual("number");
            expect(typeof positionInfo.cellID).toEqual("number");
            expect(positionInfo.timeStamp instanceof Date).toEqual(true);
        });

        it("'s internal position info object is immutable", function () {
            var positionInfo = geo.getPositionInfo(),
                immutablePositionInfo;
            positionInfo.altitude = 1;
            immutablePositionInfo = geo.getPositionInfo();
            expect(positionInfo.altitude).not.toEqual(immutablePositionInfo.altitude);
        });
    });

    describe("updatePositionInfo", function () {
        it("throws exception when invalid input", function () {
            var positionInfo = {
                    latitude: "12",
                    longitude: false,
                    altitudeAccuracy: true,
                    cellID: 62,
                    timeStamp: "dfdgfdgfdgfdgf"
                };

            expect(function () {
                geo.updatePositionInfo(positionInfo);
            }).toThrow();
        });

        it("updates successfully", function () {
            var positionInfo = {
                latitude: 11,
                longitude: 21,
                altitude: 31,
                accuracy: 41,
                altitudeAccuracy: 51,
                heading: 0,
                speed: 0,
                cellID: 61,
                timeStamp: new Date()
            };

            spyOn(db, "saveObject");
            spyOn(event, "trigger");

            geo.updatePositionInfo(positionInfo, 4, true);

            expect(db.saveObject.callCount).toBe(1);
        });
    });
});
