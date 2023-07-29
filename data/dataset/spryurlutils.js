var Spry; if (!Spry) Spry = {}; if (!Spry.Utils) Spry.Utils = {};

// Spry.Utils.urlComponentToObject
//
// Given a URL component of name value pairs, it returns an object that has the
// the URL component names as properties, and the URL component values as the value
// of those properties.
//
// The paramSeparator and nameValueSeparator args are optional. If not specified,
// the default paramSeparator is '&' and the default nameValueSeparator is '='.

Spry.Utils.urlComponentToObject = function(ucStr, paramSeparator, nameValueSeparator)
{
	var o = new Object;
	if (ucStr)
	{
		if (!paramSeparator) paramSeparator = "&";
		if (!nameValueSeparator) nameValueSeparator = "=";
		var params = ucStr.split(paramSeparator);
		for (var i = 0; i < params.length; i++)
		{
			var a = params[i].split(nameValueSeparator);
			var n = decodeURIComponent(a[0]?a[0]:"");
			var v = decodeURIComponent(a[1]?a[1]:"");
			if (v.match(/^0$|^[1-9]\d*$/))
				v = parseInt(v);
			if (typeof o[n] == "undefined")
				o[n] = v;
			else			
			{
				if (typeof o[n] != "object")
				{
					var t = o[n];
					o[n] = new Array;
					o[n].push(t);
				}
				o[n].push(v);
			}
		}
	}
	return o;
};

// Spry.Utils.getLocationHashParamsAsObject
//
// Returns window.location.hash as an object that has the the URL component
// names as properties, and the URL component values as the value of those properties.

Spry.Utils.getLocationHashParamsAsObject = function(paramSeparator, nameValueSeparator)
{
	return Spry.Utils.urlComponentToObject(window.location.hash.replace(/^#/, ""), paramSeparator, nameValueSeparator);
};

// Spry.Utils.getLocationParamsAsObject
//
// Returns window.location.search as an object that has the the URL component
// names as properties, and the URL component values as the value of those properties.

Spry.Utils.getLocationParamsAsObject = function()
{
	return Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""));
};

// Spry.Utils.getURLHashParamsAsObject
//
// Given a url string, extracts out the URL component that follows the '#' character
// and returns an object that has the the URL component names as properties, and the
// URL component values as the value of those properties.
//
// The paramSeparator and nameValueSeparator args are optional. If not specified,
// the default paramSeparator is '&' and the default nameValueSeparator is '='.

Spry.Utils.getURLHashParamsAsObject = function(url, paramSeparator, nameValueSeparator)
{
	var i;
	if (url && (i = url.search("#")) >= 0)
		return Spry.Utils.urlComponentToObject(url.substr(i+1), paramSeparator, nameValueSeparator);
	return new Object;
};

// Spry.Utils.getURLParamsAsObject
//
// Given a url string, extracts out the URL component that follows the '?' character
// and returns an object that has the the URL component names as properties, and the
// URL component values as the value of those properties.

Spry.Utils.getURLParamsAsObject = function(url)
{
	var s;
	if (url && (s = url.match(/\?[^#]*/)) && s)
		return Spry.Utils.urlComponentToObject(s[0].replace(/^\?/, ""));
	return new Object;
};
