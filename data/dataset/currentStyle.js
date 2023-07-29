/*global define, require */

define("webodf/editor/widgets/toolbarWidgets/currentStyle",
       ["webodf/editor/EditorSession"],

    function (EditorSession) {
        "use strict";

        return function CurrentStyle(callback) {
            var self = this,
                editorSession,
                paragraphStyles;

            function selectParagraphStyle(info) {
                if (paragraphStyles) {
                    if (info.type === 'style') {
                        paragraphStyles.setValue(info.styleName);
                    }
                }
            }

            function setParagraphStyle() {
                if (editorSession) {
                    editorSession.setCurrentParagraphStyle(paragraphStyles.value());
                }
                self.onToolDone();
            }

            function makeWidget(callback) {
                require(["webodf/editor/widgets/paragraphStyles"], function (ParagraphStyles) {
                    var p = new ParagraphStyles(function (pStyles) {
                        paragraphStyles = pStyles;

                        paragraphStyles.widget().onChange = setParagraphStyle;

                        paragraphStyles.setEditorSession(editorSession);
                        return callback(paragraphStyles.widget());
                    });
                    return p; // make sure p is not unused
                });
            }

            this.setEditorSession = function (session) {
                if (editorSession) {
                    editorSession.unsubscribe(EditorSession.signalParagraphChanged, selectParagraphStyle);
                }
                editorSession = session;
                if (paragraphStyles) {
                    paragraphStyles.setEditorSession(editorSession);
                }
                if (editorSession) {
                    editorSession.subscribe(EditorSession.signalParagraphChanged, selectParagraphStyle);
                    // TODO: selectParagraphStyle(editorSession.getCurrentParagraphStyle());
                }
            };

            /*jslint emptyblock: true*/
            this.onToolDone = function () {};
            /*jslint emptyblock: false*/

            makeWidget(function (widget) {
                return callback(widget);
            });
        };
    });
