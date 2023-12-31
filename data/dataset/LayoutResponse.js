"use strict";

var ViewResponse = require('./ViewResponse').ViewResponse;
var View = require('./View').View;

var LayoutResponse = ViewResponse.extend(
    /** @lends LayoutResponse */ {
},
/** @lends LayoutResponse# */{
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * @constructs
     * @param view      a View object or a view name
     * @param model     the view model object
     * @param code      optional HTTP status code
     * @param layout    the name of the layout view; defaults to 'layout'
     */
    init: function(view, model, code, layout) {

        this._super(view, model, code);
        this.layout = layout || 'layout';
    },

    ///////////////////////////////////////////////////////////////////////////////
    /**
     * Injects the ability to render the view for this response. Even if this.view
     * is already a renderable View, we need a ViewRenderer to resolve any
     * references.
     *
     * @param renderer  a ViewRenderer
     */
    setRenderer: function(renderer) {
        this.renderer = renderer;
        return this;
    },

    ///////////////////////////////////////////////////////////////////////////////
    /**
     * Writes the response body to the given stream.
     *
     * @param stream    writable stream
     */
    sendBody: function(stream) {

        // render the content view
        var content = this.renderer.render(this.view, this.model);

        // now render the layout
        var result = this.renderer.render(this.layout, {
            content: content,
            child: this.model
        });

        stream.end(result, 'utf8');
    }
});

exports.LayoutResponse = LayoutResponse;
