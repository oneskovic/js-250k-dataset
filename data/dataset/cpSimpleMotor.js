var SimpleMotor = cp.SimpleMotor = function(a, b, rate)
{
	Constraint.call(this, a, b);
	
	this.rate = rate;
	
	this.jAcc = 0;

	this.iSum = this.jMax = 0;
};

SimpleMotor.prototype = Object.create(Constraint.prototype);

SimpleMotor.prototype.preStep = function(dt)
{
	// calculate moment of inertia coefficient.
	this.iSum = 1/(this.a.i_inv + this.b.i_inv);
	
	// compute max impulse
	this.jMax = this.maxForce * dt;
};

SimpleMotor.prototype.applyCachedImpulse = function(dt_coef)
{
	var a = this.a;
	var b = this.b;
	
	var j = this.jAcc*dt_coef;
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

SimpleMotor.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	// compute relative rotational velocity
	var wr = b.w - a.w + this.rate;
	
	// compute normal impulse	
	var j = -wr*this.iSum;
	var jOld = this.jAcc;
	this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
	j = this.jAcc - jOld;
	
	// apply impulse
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

SimpleMotor.prototype.getImpulse = function()
{
	return Math.abs(this.jAcc);
};

