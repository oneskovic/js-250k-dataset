Ext.define('Ext.draw.engine.ImageExporter', {
    singleton: true,

    /**
     * @property {String} [defaultUrl="http://svg.sencha.io"]
     * The default URL to submit the form request.
     */
    defaultUrl: 'http://svg.sencha.io',

    /**
     * @property {Array} [supportedTypes=["image/png", "image/jpeg"]]
     * A list of export types supported by the server
     */
    supportedTypes: ['image/png', 'image/jpeg'],

    /**
     * @property {String} [widthParam="width"]
     * The name of the width parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    widthParam: 'width',

    /**
     * @property {String} [heightParam="height"]
     * The name of the height parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    heightParam: 'height',

    /**
     * @property {String} [typeParam="type"]
     * The name of the type parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    typeParam: 'type',

    /**
     * @property {String} [svgParam="svg"]
     * The name of the svg parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    svgParam: 'svg',

    formCls: Ext.baseCSSPrefix + 'hide-display',

    /**
     * Exports the surface to an image
     * @param {Ext.draw.Surface} surface The surface to export
     * @param {Object} [config] The following config options are supported:
     *
     * @param {Number} config.width A width to send to the server for
     * configuring the image width.
     *
     * @param {Number} config.height A height to send to the server for
     * configuring the image height.
     *
     * @param {String} config.url The url to post the data to. Defaults to
     * the {@link #defaultUrl} configuration on the class.
     *
     * @param {String} config.type The type of image to export. See the
     * {@link #supportedTypes}
     *
     * @param {String} config.widthParam The name of the width parameter to send
     * to the server. Defaults to {@link #widthParam}
     *
     * @param {String} config.heightParam The name of the height parameter to send
     * to the server. Defaults to {@link #heightParam}
     *
     * @param {String} config.typeParam The name of the type parameter to send
     * to the server. Defaults to {@link #typeParam}
     *
     * @param {String} config.svgParam The name of the svg parameter to send
     * to the server. Defaults to {@link #svgParam}
     *
     * @return {Boolean} True if the surface was successfully sent to the server.
     */
    generate: function(surface, config) {
        config = config || {};
        var me = this,
            type = config.type,
            form;

        if (Ext.Array.indexOf(me.supportedTypes, type) === -1) {
            return false;
        }

        form = Ext.getBody().createChild({
            tag: 'form',
            method: 'POST',
            action: config.url || me.defaultUrl,
            cls: me.formCls,
            children: [{
                tag: 'input',
                type: 'hidden',
                name: config.widthParam || me.widthParam,
                value: config.width || surface.width
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.heightParam || me.heightParam,
                value: config.height || surface.height
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.typeParam || me.typeParam,
                value: type
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.svgParam || me.svgParam
            }]
        });

        // Assign the data on the value so it doesn't get messed up in the html insertion
        form.last(null, true).value = Ext.draw.engine.SvgExporter.generate(surface);

        form.dom.submit();
        form.remove();
        return true;
    }

});
