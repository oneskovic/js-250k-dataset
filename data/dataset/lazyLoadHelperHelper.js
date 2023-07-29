({
    /**
     * Accepts a map of localid:qualifiedName of components to be lazy loaded.
     * For example: {'textNode':'markup://aura:text',
     * "numNode":'markup://ui:outputNumber'}
     */
    verifyLazyLoading : function(cmp, lazyCmpId_qualifiedName_map, waitIds, callbackAfterLoad) {
        for (var lazyCmpId in lazyCmpId_qualifiedName_map) {
            $A.test.assertEquals("markup://aura:placeholder",
                                 cmp.find(lazyCmpId).getDef().getDescriptor().getQualifiedName(),
                                 "Expected component with local id '"+lazyCmpId
                                 +"' to be initially represented by a placeholder.");
        }
        waitIds = $A.util.isArray(waitIds) ? waitIds : [waitIds];
        var id;
        for(id = 0; id < waitIds.length; id++) {
            this.resumeGateId(cmp, waitIds[id]);
        }
        //Wait till all specified facets marked with aura:load are replaced by actual components,
        //and then call callbackAfterLoad()
        $A.test.addWaitFor(true, function(){
                var ret = true;
                for (var lazyCmpId in lazyCmpId_qualifiedName_map) {
                    ret = ret && (lazyCmpId_qualifiedName_map[lazyCmpId]
                                  == cmp.find(lazyCmpId).getDef().getDescriptor().getQualifiedName());
                }
                return ret;
            },
            callbackAfterLoad
        );
    },

    /**
     * Resume a single wait ID, and set up a cleanup for it.
     *
     * @param cmp the component with the gated component
     * @param waitId the waitId to release.
     */
    resumeGateId : function(cmp, waitId) {
        var resume = cmp.get("c.resumeGateId");
        resume.setParams({"waitId":waitId});
        $A.test.callServerAction(resume, true);
        var clear = cmp.get("c.clearGateId");
        clear.setParams({"waitId":waitId});
        $A.test.addCleanup(function () { $A.test.callServerAction(clear, true); });
    }
})
