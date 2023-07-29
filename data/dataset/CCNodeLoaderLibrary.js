cc.NodeLoaderLibrary = cc.Class.extend({
    _ccNodeLoaders:null,

    ctor:function(){
        this._ccNodeLoaders = {};
    },

    registerDefaultCCNodeLoaders:function(){
        this.registerCCNodeLoader("CCNode", cc.NodeLoader.loader());
        this.registerCCNodeLoader("CCLayer", cc.LayerLoader.loader());
        this.registerCCNodeLoader("CCLayerColor", cc.LayerColorLoader.loader());
        this.registerCCNodeLoader("CCLayerGradient", cc.LayerGradientLoader.loader());
        this.registerCCNodeLoader("CCSprite", cc.SpriteLoader.loader());
        this.registerCCNodeLoader("CCLabelBMFont", cc.LabelBMFontLoader.loader());
        this.registerCCNodeLoader("CCLabelTTF", cc.LabelTTFLoader.loader());
        this.registerCCNodeLoader("CCScale9Sprite", cc.Scale9SpriteLoader.loader());
        this.registerCCNodeLoader("CCScrollView", cc.ScrollViewLoader.loader());
        this.registerCCNodeLoader("CCBFile", cc.BuilderFileLoader.loader());
        this.registerCCNodeLoader("CCMenu", cc.MenuLoader.loader());
        this.registerCCNodeLoader("CCMenuItemImage", cc.MenuItemImageLoader.loader());
        this.registerCCNodeLoader("CCControlButton", cc.ControlButtonLoader.loader());
        this.registerCCNodeLoader("CCParticleSystemQuad", cc.ParticleSystemLoader.loader());
    },

    registerCCNodeLoader:function(className,ccNodeLoader){
        this._ccNodeLoaders[className] =  ccNodeLoader;
    },

    unregisterCCNodeLoader:function(className){
        if(this._ccNodeLoaders[className]){
           delete this._ccNodeLoaders[className];
        }
    },

    getCCNodeLoader:function(className){
        if(this._ccNodeLoaders[className])
            return this._ccNodeLoaders[className];
        return null;
    },

    purge:function(releaseCCNodeLoaders){
        if(releaseCCNodeLoaders) {
            for(var className in this._ccNodeLoaders) {
                delete this._ccNodeLoaders[className];
            }
        }
        this._ccNodeLoaders = {};
    }
});

cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = null;
cc.NodeLoaderLibrary.library = function(){
    return new cc.NodeLoaderLibrary();
};

cc.NodeLoaderLibrary.sharedCCNodeLoaderLibrary = function(){
    if(cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary == null) {
        cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = new cc.NodeLoaderLibrary();
        cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary.registerDefaultCCNodeLoaders();
    }
    return cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary;
};

cc.NodeLoaderLibrary.purgeSharedCCNodeLoaderLibrary = function(){
    cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = null;
};

cc.NodeLoaderLibrary.newDefaultCCNodeLoaderLibrary = function(){
    var ccNodeLoaderLibrary = cc.NodeLoaderLibrary.library();
    ccNodeLoaderLibrary.registerDefaultCCNodeLoaders();
    return ccNodeLoaderLibrary;
};



