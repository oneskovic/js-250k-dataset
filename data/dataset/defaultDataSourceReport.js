Ext.namespace("OE.report.datasource");

/**
 * Default data source report function.
 *
 * Requires configuration (title, destination panel id, oe data source name and item(localized) id).
 */
OE.report.datasource.main = function (configuration) {

    OE.data.doAjaxRestricted({
        url: OE.util.getUrl('/ds/' + configuration.oeds),
        method: 'GET',
        scope: this,
        onJsonSuccess: function (response) {
            OE.report.datasource.panel({
                itemId: configuration.itemId,
                title: configuration.title,
                destination: configuration.destPanel,
                dataSource: configuration.oeds,
                data: response,

                // TODO use a real IoC solution, e.g. Angular
                detailsTabClass: configuration.detailsTabClass || 'DetailsPanel', // loaded through requirejs
                graphTabClass: configuration.graphTabClass || OE.GraphPanel,
                mapTabClass: configuration.mapTabClass || OE.MapTab
            });

            // add all displayNames to dimensionsBundle
            Ext.each(response.detailDimensions, function (dim) {
                if (Ext.isDefined(dim.displayName)) {
                    if (!dimensionsBundle[dim.name]) { // don't overwrite if there's already a name
                        dimensionsBundle[dim.name] = dim.displayName;
                    }
                }
            });

        },
        onRelogin: {callback: OE.report.datasource.main, args: [configuration]}
    });
};
