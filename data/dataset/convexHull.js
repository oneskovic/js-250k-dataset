define([],
 function(){

  'use strict';




  var getConvexHull = function(points) {
    //find first baseline
    var maxX, minX;
    var maxPt, minPt;
    var allBaseLines = [];

    var getDistant = function(cpt, bl) {
        var Vy = bl[1].x - bl[0].x;
        var Vx = bl[0].y - bl[1].y;
        return (Vx * (cpt.x - bl[0].x) + Vy * (cpt.y -bl[0].y));
    };


    var findMostDistantPointFromBaseLine = function(baseLine, points) {
        var maxD = 0;
        var maxPt = null;
        var newPoints = [];
        for (var idx in points) {
            var pt = points[idx];
            var d = getDistant(pt, baseLine);
            
            if ( d > 0) {
                newPoints.push(pt);
            } else {
                continue;
            }
            
            if ( d > maxD ) {
                maxD = d;
                maxPt = pt;
            }
        
        }
        return {'maxPoint':maxPt, 'newPoints':newPoints};
    };

    var buildConvexHull = function(baseLine, points) {
        
        allBaseLines.push(baseLine);
        var convexHullBaseLines = [];
        var t = findMostDistantPointFromBaseLine(baseLine, points);
        if (t.maxPoint) { // if there is still a point "outside" the base line
            convexHullBaseLines = convexHullBaseLines.concat(
                    buildConvexHull( [baseLine[0],t.maxPoint], t.newPoints)
                );
            convexHullBaseLines = convexHullBaseLines.concat(
                    buildConvexHull( [t.maxPoint,baseLine[1]], t.newPoints)
                );
            return convexHullBaseLines;
        } else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
            return [baseLine];
        }
    };


    for (var idx in points) {
        var pt = points[idx];
        if (pt.x > maxX || !maxX) {
            maxPt = pt;
            maxX = pt.x;
        }
        if (pt.x < minX || !minX) {
            minPt = pt;
            minX = pt.x;
        }
    }
    var ch = [].concat(buildConvexHull([minPt, maxPt], points),
                       buildConvexHull([maxPt, minPt], points));

    //convert from array of lines, to array of points
    var poly = [];
    for(var i = 0; i < ch.length; i++){
      poly.push(ch[i][0]);
    }

    //we need the points clockwise for box2d
    poly.reverse();

    return poly;
  };



  return getConvexHull;

});