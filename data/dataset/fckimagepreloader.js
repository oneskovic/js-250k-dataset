

var FCKImagePreloader = function()
{
	this._Images = new Array() ;
}

FCKImagePreloader.prototype =
{
	AddImages : function( images )
	{
		if ( typeof( images ) == 'string' )
			images = images.split( ';' ) ;

		this._Images = this._Images.concat( images ) ;
	},

	Start : function()
	{
		var aImages = this._Images ;
		this._PreloadCount = aImages.length ;

		for ( var i = 0 ; i < aImages.length ; i++ )
		{
			var eImg = document.createElement( 'img' ) ;
			FCKTools.AddEventListenerEx( eImg, 'load', _FCKImagePreloader_OnImage, this ) ;
			FCKTools.AddEventListenerEx( eImg, 'error', _FCKImagePreloader_OnImage, this ) ;
			eImg.src = aImages[i] ;

			_FCKImagePreloader_ImageCache.push( eImg ) ;
		}
	}
};

// All preloaded images must be placed in a global array, otherwise the preload
// magic will not happen.
var _FCKImagePreloader_ImageCache = new Array() ;

function _FCKImagePreloader_OnImage( ev, imagePreloader )
{
	if ( (--imagePreloader._PreloadCount) == 0 && imagePreloader.OnComplete )
		imagePreloader.OnComplete() ;
}
