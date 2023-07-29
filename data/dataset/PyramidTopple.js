var PyramidTopple = function()
{
	Demo.call(this);

	var WIDTH = 4;
	var HEIGHT = 30;

	var space = this.space;
	
	var add_domino = function(pos, flipped)
	{
		var mass = 1;
		var moment = cp.momentForBox(mass, WIDTH, HEIGHT);
		
		var body = space.addBody(new cp.Body(mass, moment));
		body.setPos(pos);

		var shape = (flipped ? new cp.BoxShape(body, HEIGHT, WIDTH) : new cp.BoxShape(body, WIDTH, HEIGHT));
		space.addShape(shape);
		shape.setElasticity(0);
		shape.setFriction(0.6);
	};

	space.iterations = 30;
	space.gravity = v(0, -300);
	space.sleepTimeThreshold = 0.5;
	space.collisionSlop = 0.5;
	
	this.addFloor();
	this.addWalls();
	
	// Add the dominoes.
	var n = 12;
	for(var i=0; i<n; i++){
		for(var j=0; j<(n - i); j++){
			var offset = v(320 + (j - (n - 1 - i)*0.5)*1.5*HEIGHT, (i + 0.5)*(HEIGHT + 2*WIDTH) - WIDTH);
			add_domino(offset, false);
			add_domino(cp.v.add(offset, v(0, (HEIGHT + WIDTH)/2)), true);
			
			if(j === 0){
				add_domino(cp.v.add(offset, v(0.5*(WIDTH - HEIGHT), HEIGHT + WIDTH)), false);
			}
			
			if(j != n - i - 1){
				add_domino(cp.v.add(offset, v(HEIGHT*0.75, (HEIGHT + 3*WIDTH)/2)), true);
			} else {
				add_domino(cp.v.add(offset, v(0.5*(HEIGHT - WIDTH), HEIGHT + WIDTH)), false);
			}
		}
	}

	// Add a circle to knock the dominoes down
	/*
	var body = space.addBody(new cp.Body(2, cp.momentForCircle(2, 0, 5, v(0,0))));
	body.setPos(v(65, 100));
	var shape = space.addShape(new cp.CircleShape(body, 5, v(0,0)));
	shape.setElasticity(0);
	*/
};

PyramidTopple.prototype = Object.create(Demo.prototype);

PyramidTopple.prototype.update = function(dt)
{
	var steps = 3;
	dt /= steps;
	for (var i = 0; i < 3; i++){
		this.space.step(dt);
	}
};

addDemo('Pyramid Topple', PyramidTopple);

