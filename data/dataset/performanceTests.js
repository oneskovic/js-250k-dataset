var startTime;

function start() {
  startTime = new Date().getTime();
}

function stop(build, test) {
    var t = new Date().getTime();
    var diff = t - startTime;
    console.log('[' + build.version + '] ' + test + ': ' + diff);
}

var tests = {
  
  'render one circle 2,000 times': function(Kinetic, container, test) {
    start();
    var stage = new Kinetic.Stage({
      width: 500,
      height: 200,
      container: container
    });

    var layer = new Kinetic.Layer();

    var circle = new Kinetic.Circle({
      x: 43,
      y: 43,
      radius: 40,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 3
    });

    layer.add(circle);
    stage.add(layer);


    for (var n=0; n<2000; n++) {
      layer.draw();
    } 
    
    stop(Kinetic, test);
  }
};

var body = document.getElementsByTagName('body')[0]; 
function run(Kinetic) {
    body.innerHTML = '';
    for (var k in tests) {
        var div = document.createElement('div');
        body.appendChild(div);
        tests[k](Kinetic, div, k);
    }
    Kinetic = null;
}

