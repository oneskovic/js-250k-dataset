/*global runtime, core, odf, ops*/

/**
 * @constructor
 * @param {core.UnitTestRunner} runner
 * @implements {core.UnitTest}
 */
ops.SessionTests = function SessionTests(runner) {
    "use strict";
    var t, r = runner,
        odfcanvas,
        testarea;

    this.setUp = function () {
        t = {};
        testarea = core.UnitTest.provideTestAreaDiv();
        odfcanvas = new odf.OdfCanvas(testarea);
        odfcanvas.setOdfContainer(new odf.OdfContainer(odf.OdfContainer.DocumentType.TEXT, null));
        t.odf = odfcanvas.odfContainer();
    };
    this.tearDown = function () {
        odfcanvas.destroy(function () { return; });
        t = {};
        core.UnitTest.cleanupTestAreaDiv();
    };
    function newSession() {
        r.shouldBe(t, "t.odf.state", "odf.OdfContainer.DONE");
        t.session = new ops.Session(odfcanvas);
        r.shouldBe(t, "t.session.getOdtDocument().getMemberIds().length", "0");
    }
    this.tests = function () {
        return r.name([
            newSession
        ]);
    };
    this.asyncTests = function () {
        return [
        ];
    };
};
ops.SessionTests.prototype.description = function () {
    "use strict";
    return "Test the Session class.";
};
