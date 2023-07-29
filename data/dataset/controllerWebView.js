describe("controllerWebView", function () {
    var controllerWebView = require('./../../../lib/controllerWebView'),
        mockedController,
        mockedInvocation,
        mockedApplication;

    beforeEach(function () {
        mockedController = {
            id: 42,
            enableWebInspector: null,
            enableCrossSiteXHR: null,
            visible: null,
            active: null,
            setGeometry: jasmine.createSpy(),
            setApplicationOrientation: jasmine.createSpy(),
            notifyApplicationOrientationDone: jasmine.createSpy(),
            publishRemoteFunction: jasmine.createSpy(),
            dispatchEvent : jasmine.createSpy()
        };
        mockedInvocation = {
            queryTargets: function (request, callback) {
                callback("error", "results");
            }
        };
        mockedApplication = {
            invocation: mockedInvocation
        };
        GLOBAL.window = {
            qnx: {
                webplatform: {
                    getController: function () {
                        return mockedController;
                    },
                    getApplication: function () {
                        return mockedApplication;
                    }
                }
            }
        };
        GLOBAL.screen = {
            width : 1024,
            height: 768
        };
    });

    describe("init", function () {
        it("sets up the controllerWebview", function () {
            controllerWebView.init({debugEnabled: true});
            expect(mockedController.enableWebInspector).toEqual(true);
            expect(mockedController.enableCrossSiteXHR).toEqual(true);
            expect(mockedController.visible).toEqual(false);
            expect(mockedController.active).toEqual(false);
            expect(mockedController.setGeometry).toHaveBeenCalledWith(0, 0, screen.width, screen.height);
        });

        it("tests that the dispatch function is called properly", function () {
            controllerWebView.init({debugEnabled: true});
            controllerWebView.dispatchEvent('Awesome Event', ['these are agruments', 'another argument']);
            expect(mockedController.dispatchEvent).toHaveBeenCalledWith('Awesome Event', ['these are agruments', 'another argument']);
        });
    });

    describe("id", function () {
        it("can get the id for the webiew", function () {
            controllerWebView.init({debugEnabled: true});
            expect(controllerWebView.id).toEqual(mockedController.id);
        });
    });

    describe("geometry", function () {
        it("can set geometry", function () {
            controllerWebView.init({debugEnabled: true});
            controllerWebView.setGeometry(0, 0, 100, 200);
            expect(mockedController.setGeometry).toHaveBeenCalledWith(0, 0, 100, 200);
        });
    });

    describe("application orientation", function () {
        it("can set application orientation", function () {
            controllerWebView.init({debugEnabled: true});
            controllerWebView.setApplicationOrientation(90);
            expect(mockedController.setApplicationOrientation).toHaveBeenCalledWith(90);
        });

        it("can notifyApplicationOrientationDone", function () {
            controllerWebView.init({debugEnabled: true});
            controllerWebView.notifyApplicationOrientationDone();
            expect(mockedController.notifyApplicationOrientationDone).toHaveBeenCalled();
        });
    });
});
