Proj4js.Proj.vandg = {

/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
	init: function() {
		this.R = 6370997.0; //Radius of earth
	},

	forward: function(p) {

		var lon=p.x;
		var lat=p.y;	

		/* Forward equations
		-----------------*/
		var dlon = Proj4js.common.adjust_lon(lon - this.long0);
		var x,y;

		if (Math.abs(lat) <= Proj4js.common.EPSLN) {
			x = this.x0  + this.R * dlon;
			y = this.y0;
		}
		var theta = Proj4js.common.asinz(2.0 * Math.abs(lat / Proj4js.common.PI));
		if ((Math.abs(dlon) <= Proj4js.common.EPSLN) || (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN)) {
			x = this.x0;
			if (lat >= 0) {
				y = this.y0 + Proj4js.common.PI * this.R * Math.tan(.5 * theta);
			} else {
				y = this.y0 + Proj4js.common.PI * this.R * - Math.tan(.5 * theta);
			}
			//  return(OK);
		}
		var al = .5 * Math.abs((Proj4js.common.PI / dlon) - (dlon / Proj4js.common.PI));
		var asq = al * al;
		var sinth = Math.sin(theta);
		var costh = Math.cos(theta);

		var g = costh / (sinth + costh - 1.0);
		var gsq = g * g;
		var m = g * (2.0 / sinth - 1.0);
		var msq = m * m;
		var con = Proj4js.common.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
		if (dlon < 0) {
		 con = -con;
		}
		x = this.x0 + con;
		con = Math.abs(con / (Proj4js.common.PI * this.R));
		if (lat >= 0) {
		 y = this.y0 + Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con);
		} else {
		 y = this.y0 - Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con);
		}
		p.x = x;
		p.y = y;
		return p;
	},

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
	inverse: function(p) {
		var dlon;
		var xx,yy,xys,c1,c2,c3;
		var al,asq;
		var a1;
		var m1;
		var con;
		var th1;
		var d;

		/* inverse equations
		-----------------*/
		p.x -= this.x0;
		p.y -= this.y0;
		con = Proj4js.common.PI * this.R;
		xx = p.x / con;
		yy =p.y / con;
		xys = xx * xx + yy * yy;
		c1 = -Math.abs(yy) * (1.0 + xys);
		c2 = c1 - 2.0 * yy * yy + xx * xx;
		c3 = -2.0 * c1 + 1.0 + 2.0 * yy * yy + xys * xys;
		d = yy * yy / c3 + (2.0 * c2 * c2 * c2 / c3 / c3 / c3 - 9.0 * c1 * c2 / c3 /c3) / 27.0;
		a1 = (c1 - c2 * c2 / 3.0 / c3) / c3;
		m1 = 2.0 * Math.sqrt( -a1 / 3.0);
		con = ((3.0 * d) / a1) / m1;
		if (Math.abs(con) > 1.0) {
			if (con >= 0.0) {
				con = 1.0;
			} else {
				con = -1.0;
			}
		}
		th1 = Math.acos(con) / 3.0;
		if (p.y >= 0) {
			lat = (-m1 *Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI;
		} else {
			lat = -(-m1 * Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI;
		}

		if (Math.abs(xx) < Proj4js.common.EPSLN) {
			lon = this.long0;
		}
		lon = Proj4js.common.adjust_lon(this.long0 + Proj4js.common.PI * (xys - 1.0 + Math.sqrt(1.0 + 2.0 * (xx * xx - yy * yy) + xys * xys)) / 2.0 / xx);

		p.x=lon;
		p.y=lat;
		return p;
	}
};
