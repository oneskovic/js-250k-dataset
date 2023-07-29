//@
//@ ## five
//@
//@ Main object. Typical usage is:
//@
//@ ```
//@ var five = require('path-to-node-five-dir');
//@ ```

var qt = require('node-qt');

var app = new qt.QApplication();
var timerHandler, tickStop = false;

//@
//@ #### useInterval()
//@ Add event handler to Node's event loop via setTimeout(). This is the default event loop integration.
exports.useInterval = function() {
  if (timerHandler)
    clearInterval(timerHandler);    
  tickStop = true;  
  
  timerHandler = setInterval(function(){
    app.processEvents();
  }, 0);
}

//@
//@ #### useTick()
//@ Add event handler to Node's event loop via `process.nextTick()`.
//@ This should used in applications that require more instant responsiveness (CPU-intensive!).
exports.useTick = function() {
  var registerNextTick = function() {
    process.nextTick(function(){
      app.processEvents();
      if (!tickStop) registerNextTick();
    });
  };

  if (timerHandler)
    clearInterval(timerHandler);
  tickStop = false;
  
  registerNextTick();
}

//@
//@ #### stop()
//@ Stop Node-Five's event loop. Applications never exit without a call to this method.
exports.stop = function() {
  clearInterval(timerHandler);
}
