/*
 *  Js-Test-Driver Test Suite for JXG.AbstractRenderer
 *  http://code.google.com/p/js-test-driver
 */

TestCase("AbstractRenderer", {
    ar: null,

    setUp: function () {
        document.getElementsByTagName('body')[0].innerHTML = '<div id="jxgbox" style="width: 100px; height: 100px;"></div>';
        this.ar = new JXG.AbstractRenderer();
        this.ar.container = document.getElementById('jxgbox');
    },

    tearDown: function () {
        this.ar = null;
        document.getElementsByTagName('body')[0].innerHTML = '';
    },

    /* Test HTML-Text Element Drawing and Updating */

    setUpTextElement: function (id) {
        var element = {
                visProp: {
                    strokecolor: 'black',
                    visible: true,
                    fontsize: '10px',
                    display: 'html',
                    useasciimathmL: false,
                    usemathjax: false
                },
                visPropOld: {
                    fontsize: '9px'
                },
                id: id,
                transformations: [],
                plaintext: 'text',
                size: [10, 10],
                board: {
                    options: {
                        layer: {
                            text: 10
                        }
                    }
                },
                coords: {
                    scrCoords: [1, 10, 10]
                }
            };

        this.ar.drawText(element);

        return element;
    },

    testDrawText: function () {
        expectAsserts(2);

        var element = this.setUpTextElement('textnode'),
            node = document.getElementById('jxgbox_textnode');
        assertNotNull('text has been added', node);
        assertEquals('text content', 'text', node.innerHTML);

        // colors involve {SVG,VML,Canvas}Renderer, don't test here!
        //assertTrue('text color', '#000000' === node.style.color || 'black' === node.style.color);
    },

    testUpdateText: function () {
        expectAsserts(2);

        var element = this.setUpTextElement('textnode'),
            node = document.getElementById('jxgbox_textnode'),
            pos = [parseInt(node.style.left), parseInt(node.style.top)],
            diff;

        element.plaintext = 'updated text';
        element.coords.scrCoords = [1, 20, 20];
        this.ar.updateText(element);
        diff = [parseInt(node.style.left) - pos[0], parseInt(node.style.top) - pos[1]];

        assertEquals('text content', 'updated text', node.innerHTML);
        assertEquals('text position difference', [10, 10], diff);
    },

    testUpdateTextStyle: function () {
        expectAsserts(1);

        var element = this.setUpTextElement('textnode'),
            node = document.getElementById('jxgbox_textnode');

        element.visProp.strokecolor = 'green';
        element.visProp.fontsize = 10;
        this.ar.updateTextStyle(element);

        //assertTrue('text color', '#008000' === node.style.color || 'green' === node.style.color);
        assertEquals('text size', '10px', node.style.fontSize);
    }


});
