var Framebuffer, Renderbuffer, framebufferBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

framebufferBinding = null;

exports.Framebuffer = Framebuffer = (function() {

  function Framebuffer(gl) {
    this.gl = gl;
    this.buffer = this.gl.createFramebuffer();
  }

  Framebuffer.prototype.bind = function() {
    if (framebufferBinding !== this) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer);
      framebufferBinding = this;
    }
    return this;
  };

  Framebuffer.prototype.unbind = function() {
    if (framebufferBinding !== null) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      framebufferBinding = null;
    }
    return this;
  };

  Framebuffer.prototype.check = function() {
    var result;
    result = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    switch (result) {
      case this.gl.FRAMEBUFFER_UNSUPPORTED:
        throw 'Framebuffer is unsupported';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        throw 'Framebuffer incomplete attachment';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        throw 'Framebuffer incomplete dimensions';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        throw 'Framebuffer incomplete missing attachment';
    }
    return this;
  };

  Framebuffer.prototype.color = function(texture) {
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, texture.target, texture.handle, 0);
    this.check();
    return this;
  };

  Framebuffer.prototype.depth = function(buffer) {
    this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffer.id);
    this.check();
    return this;
  };

  Framebuffer.prototype.destroy = function() {
    return this.gl.deleteFramebuffer(this.buffer);
  };

  return Framebuffer;

})();

Renderbuffer = (function() {

  function Renderbuffer(gl) {
    this.gl = gl;
    this.id = this.gl.createRenderbuffer();
  }

  Renderbuffer.prototype.setSize = function(width, height) {
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.id);
    this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl[this.format], width, height);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
    return this;
  };

  return Renderbuffer;

})();

exports.Depthbuffer = (function(_super) {

  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.format = 'DEPTH_COMPONENT16';

  return _Class;

})(Renderbuffer);
