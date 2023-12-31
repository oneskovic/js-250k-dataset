/**
 * Convert DXF string to SVG format.
 * @param {string} dxfString The DXF string to be converted.
 * @returns {string|null} The converted SVG string or null if the conversion was unsuccessful.
 */
function dxfToSvg(dxfString)
{
    "use strict";

    function dxfObjectToSvgSnippet(dxfObject)
    {
        function getLineSvg(x1, y1, x2, y2)
        {
            return '<path d="M{0},{1} {2},{3}"/>\n'.format(x1, y1, x2, y2);
        }

        function deg2rad(deg)
        {
            return deg * (Math.PI/180);
        }

        switch (dxfObject.type) {
            case 'LINE':
                return getLineSvg(dxfObject.x, dxfObject.y, dxfObject.x1, dxfObject.y1);
            case 'CIRCLE':
                return '<circle cx="{0}" cy="{1}" r="{2}"/>\n'.format(dxfObject.x, dxfObject.y, dxfObject.r);
            case 'ARC':
                var x1 = dxfObject.x + dxfObject.r * Math.cos(deg2rad(dxfObject.a0));
                var y1 = dxfObject.y + dxfObject.r * Math.sin(deg2rad(dxfObject.a0));
                var x2 = dxfObject.x + dxfObject.r * Math.cos(deg2rad(dxfObject.a1));
                var y2 = dxfObject.y + dxfObject.r * Math.sin(deg2rad(dxfObject.a1));

                if (dxfObject.a1 < dxfObject.a0) {
                    dxfObject.a1 += 360;
                }
                var largeArcFlag = dxfObject.a1 - dxfObject.a0 > 180 ? 1 : 0;

                return '<path d="M{0},{1} A{2},{3} 0 {4},1 {5},{6}"/>\n'.
                        format(x1, y1, dxfObject.r, dxfObject.r, largeArcFlag, x2, y2);
            case 'LWPOLYLINE':
                var svgSnippet = '';
                var vertices = dxfObject.vertices;
                for (var i=0; i<vertices.length-1; i++) {
                    var vertice1 = vertices[i];
                    var vertice2 = vertices[i+1];
                    svgSnippet += getLineSvg(vertice1.x, vertice1.y, vertice2.x, vertice2.y);
                }
                return svgSnippet;
        }
    }

    var groupCodes = {
        0: 'entityType',
        2: 'blockName',
        10: 'x',
        11: 'x1',
        20: 'y',
        21: 'y1',
        40: 'r',
        50: 'a0',
        51: 'a1'
    };

    var supportedEntities = [
        'LINE',
        'CIRCLE',
        'ARC',
        'LWPOLYLINE'
    ];

    var counter = 0;
    var code = null;
    var isEntitiesSectionActive = false;
    var object = {};
    var svg = '';

    // Normalize platform-specific newlines.
    dxfString = dxfString.replace(/\r\n/g, '\n');
    dxfString = dxfString.replace(/\r/g, '\n');

    dxfString.split('\n').forEach(function(line) {
        line = line.trim();

        if (counter++ % 2 === 0) {
            code = parseInt(line);
        } else {
            var value = line;
            var groupCode = groupCodes[code];
            if (groupCode === 'blockName' && value === 'ENTITIES') {
                isEntitiesSectionActive = true;
            } else if (isEntitiesSectionActive) {
                if (groupCode === 'entityType') {  // New entity starts.
                    if (object.type) {
                        svg += dxfObjectToSvgSnippet(object);
                    }

                    object = $.inArray(value, supportedEntities) > -1 ? {type: value} : {};

                    if (value === 'ENDSEC') {
                        isEntitiesSectionActive = false;
                    }
                } else if (object.type && typeof groupCode !== 'undefined') {  // Known entity property recognized.
                    object[groupCode] = parseFloat(value);

                    if (object.type == 'LWPOLYLINE' && groupCode === 'y') {
                        if (!object.vertices) {
                            object.vertices = [];
                        }
                        object.vertices.push({x:object.x, y:object.y});
                    }
                }
            }
        }
    });

    if (svg === '') {
        return null;
    }

    var strokeWidth = 0.2;
    var pixelToMillimeterConversionRatio = 3.543299873306695;
    var svgId = "svg" + Math.round(Math.random() * Math.pow(10, 17));
    svg = '<svg {0} version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
          '<g transform="scale({0},-{0})" '.format(pixelToMillimeterConversionRatio) +
            ' style="stroke:black; stroke-width:' + strokeWidth + '; ' +
                    'stroke-linecap:round; stroke-linejoin:round; fill:none">\n' +
          svg +
          '</g>\n' +
          '</svg>\n';

    // The SVG has to be added to the DOM to be able to retrieve its bounding box.
    $(svg.format('id="'+svgId+'"')).appendTo('body');
    var boundingBox = $('svg')[0].getBBox();
    var viewBoxValue = '{0} {1} {2} {3}'.format(boundingBox.x-strokeWidth/2, boundingBox.y-strokeWidth/2,
                                                boundingBox.width+strokeWidth, boundingBox.height+strokeWidth);
    $('#'+svgId).remove();

    return svg.format('viewBox="' + viewBoxValue + '"');
}
