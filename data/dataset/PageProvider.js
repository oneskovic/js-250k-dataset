/**
 * Page provider
 */
Aria.classDefinition({
    $classpath : "test.aria.pageEngine.pageEngine.customRootModule.PageProvider",
    $implements : ["aria.pageEngine.pageProviders.PageProviderInterface"],
    $prototype : {

        /**
         * @param {aria.pageEngine.CfgBeans.ExtendedCallback} callback
         */
        loadSiteConfig : function (callback) {
            var siteConfig = {
                appData : {
                    message : "realAppData"
                },
                containerId : "at-main",
                storage : {
                    active : false
                },
                commonModules : {
                    "m1" : {
                        classpath : "test.aria.pageEngine.pageEngine.customRootModule.modules.TestModule",
                        initArgs : {
                            id : "m1"
                        }
                    }
                }
            };
            this.$callback(callback.onsuccess, siteConfig);
        },

        /**
         * @param {aria.pageEngine.CfgBeans:PageRequest} pageId Id of the page
         * @param {aria.pageEngine.CfgBeans.ExtendedCallback} callback
         */
        loadPageDefinition : function (pageRequest, callback) {
            this.$callback(callback.onsuccess, {
                pageId : "aaa",
                url : "/pageEngine/aaa",
                title : "page_aaa",
                pageComposition : {
                    template : "test.aria.pageEngine.pageEngine.site.templates.MainLayout",
                    modules : {
                        "m2" : {
                            classpath : "test.aria.pageEngine.pageEngine.customRootModule.modules.TestModule",
                            initArgs : {
                                id : "m2"
                            }
                        }
                    },
                    placeholders : {
                        "header" : {
                            module : "common:m1",
                            template : "test.aria.pageEngine.pageEngine.site.templates.Body"
                        },
                        "body" : {
                            module : "m2",
                            template : "test.aria.pageEngine.pageEngine.site.templates.Body"
                        }
                    }
                }
            });
        }
    }
});
