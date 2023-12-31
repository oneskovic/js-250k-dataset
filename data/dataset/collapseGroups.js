'use strict';

exports.type = 'perItemReverse';

exports.active = true;

var animationElems = require('./_collections').elemsGroups.animation;


exports.fn = function(item) {

    // non-empty elements
    if (item.isElem() && !item.isElem('switch') && !item.isEmpty()) {

        item.content.forEach(function(g, i) {

            // non-empty groups
            if (g.isElem('g') && !g.isEmpty()) {

                // move group attibutes to the single content element
                if (g.hasAttr() && g.content.length === 1) {
                    var inner = g.content[0];

                    if (inner.isElem() && !inner.hasAttr('id') && (
                        !g.hasAttr('clip-path') ||
                        inner.isElem('g') && !g.hasAttr('transform') && !inner.hasAttr('transform')
                    )) {
                        g.eachAttr(function(attr) {
                            if (!inner.hasAttr(attr.name)) {
                                inner.addAttr(attr);
                            } else if (attr.name == 'transform' || attr.name == 'class') {
                                inner.attr(attr.name).value = attr.value + ' ' + inner.attr(attr.name).value;
                            }
                            g.removeAttr(attr.name);
                        });
                    }
                }

                // collapse groups without attributes
                if (!g.hasAttr() && !g.content.some(function(item) { return item.isElem(animationElems) })) {
                    item.spliceContent(i, 1, g.content);
                }
            }

        });

    }

};
