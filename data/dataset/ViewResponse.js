"use strict";

var Response = require('./Response').Response;
var View = require('./View').View;

var ViewResponse = Response.extend(
    /** @lends ViewResponse */ {
},
/** @lends ViewResponse# */{
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * @constructs
     * @param view      a View object or a view name
     * @param model     the view model object
     * @param code      optional HTTP status code
     */
    init: function(view, model, code) {

        this._super(code);
        this.view = view;
        this.model = model;
        this.setContentType('text/html', 'utf8');
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
        stream.end(this.renderer.render(this.view, this.model), 'utf8');
    }
});

exports.ViewResponse = ViewResponse;
