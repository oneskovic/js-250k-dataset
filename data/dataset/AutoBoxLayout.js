/**
 * @class App.widget.AutoBoxLayout
 * @author Simon Brunel
 *
 * Layout for which its orientation is based on the current device orientation.
 */
Ext.define('App.widget.AutoBoxLayout', {
    extend: 'Ext.layout.FlexBox',
    alias: 'layout.autobox',

    config: {

        /**
         * @cfg {Boolean} auto
         *
         * If *true*, the layout orientation (orient) will automatically be
         * changed according to the current device (viewport) orientation:
         *
         * - *vertical* layout if device is in *portrait* mode
         * - *horizontal* layout if device is in *landscape* mode
         *
         * @accessor
         */
        auto: true,

        /**
         * @cfg {Boolean} reverse
         * Reversed layout are *vertical* in *landscape*, else *horizontal*.
         * @accessor
         */
        reverse: false
    },

    statics: {

        /**
         * @private
         */
        _reverseOrient: function(orient) {
            return (orient == 'vertical'? 'horizontal' : 'vertical');
        }
    },

    updateAuto: function(auto) {
        if (auto) {
            Ext.Viewport.on('orientationchange', '_orientationChange', this);
            this._updateOrientation();
        } else {
            Ext.Viewport.un('orientationchange', '_orientationChange', this);
        }
    },

    /**
     * @private
     */
    _updateOrientation: function(orientation) {
        orientation = orientation || Ext.Viewport.getOrientation();
        var orient = (orientation == 'portrait' ? 'vertical' : 'horizontal');
        this.setOrient(
            this.getReverse()?
                this.self._reverseOrient(orient) :
                orient);
    },

    /**
     * @private
     * Called when the viewport orientation have changed.
     */
    _orientationChange: function(viewport, orientation) {
        if (!this.getAuto()) {
            return;
        }

        this._updateOrientation(orientation);
    }
});
