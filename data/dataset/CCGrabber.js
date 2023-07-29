/** FBO class that grabs the the contents of the screen */
cc.Grabber = cc.Class.extend({
    _FBO:null,
    _oldFBO:null,
    _oldClearColor:null,

    _gl:null,

    ctor:function () {
        cc._checkWebGLRenderMode();
        this._gl = cc._renderContext;
        this._oldClearColor = [0, 0, 0, 0];
        this._oldFBO = null;
        // generate FBO
        this._FBO = this._gl.createFramebuffer();
    },

    grab:function (texture) {
        var locGL = this._gl;
        this._oldFBO = locGL.getParameter(locGL.FRAMEBUFFER_BINDING);
        // bind
        locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._FBO);
        // associate texture with FBO
        locGL.framebufferTexture2D(locGL.FRAMEBUFFER, locGL.COLOR_ATTACHMENT0, locGL.TEXTURE_2D, texture._webTextureObj, 0);

        // check if it worked (probably worth doing :) )
        var status = locGL.checkFramebufferStatus(locGL.FRAMEBUFFER);
        if (status != locGL.FRAMEBUFFER_COMPLETE)
            cc.log("Frame Grabber: could not attach texture to frmaebuffer");
        locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._oldFBO);
    },

    beforeRender:function (texture) {
        var locGL = this._gl;
        this._oldFBO = locGL.getParameter(locGL.FRAMEBUFFER_BINDING);
        locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._FBO);

        // save clear color
        this._oldClearColor = locGL.getParameter(locGL.COLOR_CLEAR_VALUE);

        // BUG XXX: doesn't work with RGB565.
        locGL.clearColor(0, 0, 0, 0);

        // BUG #631: To fix #631, uncomment the lines with #631
        // Warning: But it CCGrabber won't work with 2 effects at the same time
        //  glClearColor(0.0f,0.0f,0.0f,1.0f);    // #631

        locGL.clear(locGL.COLOR_BUFFER_BIT | locGL.DEPTH_BUFFER_BIT);

        //  glColorMask(true, true, true, false);    // #631
    },

    afterRender:function (texture) {
        var locGL = this._gl;
        locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._oldFBO);
        locGL.colorMask(true, true, true, true);      // #631
    },

    destroy:function(){
        this._gl.deleteFramebuffer(this._FBO);
    }
});
