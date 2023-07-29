/*jslint browser:true */
/*global esprima:true, escodegen:true, require:true */

function id(i) {
    'use strict';
    return document.getElementById(i);
}

function setText(id, str) {
    'use strict';
    var el = document.getElementById(id);
    if (typeof el.innerText === 'string') {
        el.innerText = str;
    } else {
        el.textContent = str;
    }
}

function sourceRewrite() {
    'use strict';

    var code, syntax, indent, quotes, option;

    if (typeof window.editor !== 'undefined') {
        code = window.editor.getText();
    } else {
        code = id('code').value;
    }

    indent = '';
    if (id('onetab').checked) {
        indent = '\t';
    } else if (id('twospaces').checked) {
        indent = '  ';
    } else if (id('fourspaces').checked) {
        indent = '    ';
    }

    quotes = 'auto';
    if (id('singlequotes').checked) {
        quotes = 'single';
    } else if (id('doublequotes').checked) {
        quotes = 'double';
    }

    option = {
        comment: true,
        format: {
            indent: {
                style: indent
            },
            quotes: quotes
        }
    };

    try {
        syntax = window.esprima.parse(code, { raw: true, tokens: true, range: true, comment: true });
        syntax = window.escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
        code = window.escodegen.generate(syntax, option);
        window.editor.setText(code);
        setText('info', 'Rewriting was successful.');
    } catch (e) {
        id('info').innerHTML = e.toString();
        setText('info', e.toString());
    }
}

/*jslint sloppy:true browser:true */
/*global sourceRewrite:true */
window.onload = function () {

    id('rewrite').onclick = sourceRewrite;

    try {
        require(['custom/editor'], function (editor) {
            window.editor = editor({ parent: 'editor', lang: 'js' });
            window.editor.getTextView().getModel().addEventListener("Changed", function () {
                document.getElementById('info').innerHTML = 'Ready.';
            });
        });
    } catch (e) {
    }
};
