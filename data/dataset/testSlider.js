/*
 *  Js-Test-Driver Test Suite for the slider element
 *  http://code.google.com/p/js-test-driver
 */

TestCase("Slider", {
    board: null,

    setUp: function () {
        try {
            document.getElementsByTagName('body')[0].innerHTML = '<div id="jxgbox" style="width: 100px; height: 100px;"></div>';
            this.board = JXG.JSXGraph.initBoard('jxgbox', {axis: false, grid: false, boundingbox: [-5, 5, 5, -5], showCopyright: false, showNavigation: false});
        } catch (e) {
            console.log(e, e.stack);
        }
    },

    tearDown: function () {
        try {
            JXG.JSXGraph.freeBoard(this.board);
            this.board = null;
            document.getElementsByTagName('body')[0].innerHTML = '';
        } catch (e) {
            console.log(e, e.stack);
        }
    },

    testCreateSlider: function () {
        expectAsserts(5);

        var s;

        assertNoException('slider successfully created', (function (_that) {
            return function () {
                _that.board.create('slider', [[0, 0], [1, 0], [0, 5, 10]]);
            };
        })(this));

        s = this.board.create('slider', [[0, 0], [1, 0], [0, 5, 10]]);
        assertObject('slider is an object', s);
        assertInstanceOf('slider is an instance of JXG.Point', JXG.Point, s);
        assertEquals('slider.type is JXG.OBJECT_TYPE_GLIDER', JXG.OBJECT_TYPE_GLIDER, s.type);
        assertEquals('slider.elementClass is JXG.OBJECT_CLASS_POINT', JXG.OBJECT_CLASS_POINT, s.elementClass);
    },

    testValue: function () {
        expectAsserts(1);
        var s;

        s = this.board.create('slider', [[0, 0], [1, 0], [0, 5, 10]]);
        assertTrue('initial slider value corresponds to Value()', Math.abs(5 - s.Value()) < JXG.Math.eps);
    },

    testIds: function () {
        expectAsserts(6);
        var s;

        s = this.board.create('slider', [[0, 0], [1, 0], [0, 5, 10]], {
            id: '_glider',
            withLabel: true,
            name: 'S',
            point1: {
                id: '_point1'
            },
            point2: {
                id: '_point2'
            },
            baseline: {
                id: '_baseline'
            },
            highline: {
                id: '_highline'
            },
            label: {
                id: '_label'
            }
        });
        assertEquals('slider id', '_glider', s.id);
        assertEquals('slider point1 id', '_point1', s.point1.id);
        assertEquals('slider point2 id', '_point2', s.point2.id);
        assertEquals('slider baseline id', '_baseline', s.baseline.id);
        assertEquals('slider highline id', '_highline', s.highline.id);
        assertEquals('slider label id', '_label', s.label.id);
    }
});

