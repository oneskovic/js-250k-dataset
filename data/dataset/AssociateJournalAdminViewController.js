Ext.define('Ssp.controller.admin.journal.AssociateJournalAdminViewController', {
	extend: 'Ssp.controller.admin.AdminItemAssociationViewController',
    config: {
        associatedItemType: 'journalStepDetail',
        parentItemType: 'journalStep',
        parentIdAttribute: 'journalStepId',
        associatedItemIdAttribute: 'journalStepDetailId'
    },
    onBeforeDrop: function(node, data, overModel, dropPosition, dropHandler, eOpts) {
    	var me=this;
    	var url, parentId, associatedItemId, node;
    	
    	
    	// ensure the drop handler waits for the drop
    	dropHandler.wait=true;
    	if(data.records[0].get('objectStatus') ==='INACTIVE')
    	{
            Ext.Msg.alert('SSP Error','You cannot assign inactive reference items');
            dropHandler.cancelDrop;
            return 1;
    	}
    	// handle drop on a folder
        if (!overModel.isLeaf() && dropPosition == 'append')
        {
        	node = overModel;
        	parentId = me.treeUtils.getIdFromNodeId(node.data.id);
			
        	associatedItemId = me.treeUtils.getIdFromNodeId(data.records[0].get('id'));
        	parentUrl = me.apiProperties.getItemUrl( me.getParentItemType() ) + '/' + parentId + '/' + me.getAssociatedItemType(); 	
        	url = me.apiProperties.createUrl( parentUrl );
		
			if (node.get('qtitle') && node.get('qtitle') == 'INACTIVE') {
				dropHandler.cancelDrop;
        		return 1;
			}
			
			var requestData = {id:associatedItemId, sortOrder:0 };

			me.apiProperties.makeRequest({
				url: url,
				method: 'POST',
				jsonData: requestData,
				successFunc: function(response, view){
					me.getAssociatedItems(node, parentId);
				}
			});
        }

        // handle drop inside a folder
        if ((dropPosition=='before' || dropPosition=='after') && overModel.isLeaf())
        {
        	var index;
        	node = overModel.parentNode;
        	parentId = me.treeUtils.getIdFromNodeId(node.data.id);
			
        	associatedItemId = me.treeUtils.getIdFromNodeId(data.records[0].get('id'));
        	parentUrl = me.apiProperties.getItemUrl( me.getParentItemType() ) + '/' + parentId + '/' + me.getAssociatedItemType(); 	
        	url = me.apiProperties.createUrl( parentUrl );
		
			if (node.get('qtitle') && node.get('qtitle') == 'INACTIVE') {
				dropHandler.cancelDrop;
        		return 1;
			}
			
			var requestData = {id:associatedItemId, sortOrder:0 };
			
			//find the index for the 'overModel'
			for(var i=0; i<node.childNodes.length; i++)
			{
				var childNodeId =  me.treeUtils.getIdFromNodeId(node.childNodes[i].data.id);
				var overmodelId = me.treeUtils.getIdFromNodeId(overModel.data.id);
				if(childNodeId === overmodelId)
				{
					if(dropPosition==='before')
					{
						index = i;
					}
					if(dropPosition==='after')
					{
						index = i+1;
					}
				}
			}
			var requestData = {id:associatedItemId, sortOrder:index };

			me.apiProperties.makeRequest({
				url: url,
				method: 'POST',
				jsonData: requestData,
				successFunc: function(response, view){
					me.getAssociatedItems(node, parentId);
				}
			});     
			}	
        
        dropHandler.cancelDrop;
        
        return 1;
    }
});