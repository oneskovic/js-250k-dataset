JX.behavior('view-placeholder', function(config, statics) {
  JX.ViewPlaceholder.register(config.trigger_id, config.id, function() {
    var replace = JX.$(config.id);

    var children = config.children;
    if (typeof children === "string") {
      children = JX.$H(children);
    }

    var view = new JX[config.view](config.params, children);
    var rendered = JX.ViewRenderer.render(view);

    JX.DOM.replace(replace, rendered);
  });
});

JX.install('ViewPlaceholder', {
  statics: {
    register: function(wait_on_token, token, cb) {
      var ready_q = [];

      if (!wait_on_token || wait_on_token in JX.ViewPlaceholder.ready) {
        ready_q.push({token: token, cb: cb});
      } else {
        var waiting = JX.ViewPlaceholder.waiting;
        waiting[wait_on_token] = waiting[wait_on_token] || [];
        waiting[wait_on_token].push({token: token, cb: cb});
      }

      while(ready_q.length) {
        var ready = ready_q.shift();

        var waiting = JX.ViewPlaceholder.waiting[ready.token];
        if (waiting) {
          for (var ii = 0; ii < waiting.length; ii++) {
            ready_q.push(waiting[ii]);
          }
          delete JX.ViewPlaceholder.waiting[ready.token];
        }
        ready.cb();

        JX.ViewPlaceholder.ready[token] = true;
      }

    },
    ready: {},
    waiting: {}
  }
});
