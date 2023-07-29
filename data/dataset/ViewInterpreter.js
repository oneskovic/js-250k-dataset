JX.install('ViewInterpreter', {
  members : {
    register : function(name, view_cls) {
      this[name] = function(/* [properties, ]children... */) {
        var properties = arguments[0] || {};
        var children = Array.prototype.slice.call(arguments, 1);

        // Passing properties is optional
        if (properties instanceof JX.View ||
            properties instanceof JX.HTML ||
            properties.nodeType ||
            typeof properties === "string") {
          children.unshift(properties);
          properties = {};
        }

        var result = new view_cls(properties).setName(name);
        result.addChildren(children);

        return result;
      }
    }
  }
});
