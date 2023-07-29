// define namespace
if(!Repository) var Repository = {};
if(!Repository.Plugins) Repository.Plugins = {};

/**
 * Supplies filtering by model type (stencil set)
 * Note: Only stencil sets defined in the stencilsets.json can be selected as filter
 */

Repository.Plugins.LanguageSupport = {
	
	IMAGE_URLS: {
		de: '/backend/images/flags/de.png',
		en_us: '/backend/images/flags/us.png',
		en: '/backend/images/flags/us.png',
		ru: '/backend/images/flags/ru.png',
		es: '/backend/images/flags/es.png'
	},

	hidePanel: true,
	
	construct: function( facade ) {
		
		// define Create New Model menu
		this.toolbarButtons = [];
		this.facade 		= facade;
		
		var currentLanguage	= this.facade.modelCache.getLanguage();
		currentLanguage		= currentLanguage.languagecode + ( currentLanguage.countrycode ? "_" + currentLanguage.countrycode : "");
		
		
		this.facade.modelCache.getAvailableLanguages().each(function(type) {
			
			var language = type.languagecode + ( type.countrycode ? "_" + type.countrycode : "");
			
			this.toolbarButtons.push({
				text 		: Repository.I18N[language],
				region		: 'right',
				menu 		: Repository.I18N[currentLanguage],
				menuIcon 	: this.IMAGE_URLS[currentLanguage],
				tooltipText : Repository.I18N[currentLanguage],
				icon 		: this.IMAGE_URLS[language],
				handler		: this._setLanguage.bind(this, type)				
			});
		}.bind(this));
					
		arguments.callee.$.construct.apply(this, arguments); //call Plugin super class

	},
	
	_setLanguage: function( type ){
		this.facade.modelCache.setLanguage( type.languagecode, type.countrycode )
	}
};

Repository.Plugins.LanguageSupport = Repository.Core.ContextPlugin.extend(Repository.Plugins.LanguageSupport);
