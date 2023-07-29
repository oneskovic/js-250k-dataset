var UndoManager = require('index').UndoManager;
var t = require('plugindev');

exports.testUndoAndRedo = function() {
    var undoManager = new UndoManager();

    var redoReceived = null;
    var undoReceived = null;

    var receiver = {
        redo: function(context) {
            redoReceived = context;
            return true;
        },

        undo: function(context) {
            undoReceived = context;
            return true;
        }
    };

    undoManager.registerUndo(receiver, 'foo');
    t.equal(undoManager._undoStack.length, 1, 'the size of the undo stack ' +
        'after one action and 1');
    t.equal(undoManager._redoStack.length, 0, 'the size of the redo stack ' +
        'after one action and 0');

    undoManager.registerUndo(receiver, 'bar');
    t.equal(undoManager._undoStack.length, 2, 'the size of the undo stack ' +
        'after two actions and 2');
    t.equal(undoManager._redoStack.length, 0, 'the size of the redo stack ' +
        'after two actions and 0');

    undoManager.undo();
    t.equal(undoReceived, 'bar', 'the context received after undoing \'bar\' ' +
        'and \'bar\'');
    t.equal(undoManager._undoStack.length, 1, 'the size of the undo stack ' +
        'after two actions and one undo and 1');
    t.equal(undoManager._redoStack.length, 1, 'the size of the redo stack ' +
        'after two actions and one undo and 1');

    undoManager.undo();
    t.equal(undoReceived, 'foo', 'the context received after undoing \'foo\' ' +
        'and \'foo\'');
    t.equal(undoManager._undoStack.length, 0, 'the size of the undo stack ' +
        'after undoing two actions and 0');
    t.equal(undoManager._redoStack.length, 2, 'the size of the redo stack ' +
        'after undoing two actions and 2');

    undoManager.redo();
    t.equal(redoReceived, 'foo', 'the context received after redoing \'foo\' ' +
        'and \'foo\'');
    t.equal(undoManager._undoStack.length, 1, 'the size of the undo stack ' +
        'after redoing \'foo\' and 1');
    t.equal(undoManager._redoStack.length, 1, 'the size of the redo stack ' +
        'after redoing \'foo\' and 1');

    undoManager.registerUndo(receiver, 'baz');
    t.equal(undoManager._undoStack.length, 2, 'the size of the undo stack ' +
        'after undoing twice, redoing once, and performing an action; and 2');
    t.equal(undoManager._redoStack.length, 0, 'the size of the redo stack ' +
        'after undoing twice, redoing once, and performing an action; and 0');
};

