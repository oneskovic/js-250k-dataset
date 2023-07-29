/**
 * Dialog for member selections
 */
var DrillAcrossModal = DrillthroughModal.extend({

	allMeasures: true,

	templateContent: function() {
		return $("#template-drillacross").html();
	},

	ok: function() {
		var self = this;
		var selections = {};
		$(this.el).find('.check_level:checked').each( function(index) {
			var key = $(this).attr('key');
			if (!selections[key]) {
				selections[key] = [];
			}
			selections[key].push($(this).val());
		});

		Saiku.ui.block("Executing drillacross...");
		this.query.action.post("/drillacross", { data: { position: this.position, drill: JSON.stringify(selections)}, success: function(model, response) {
			self.workspace.query.parse(response);
			self.workspace.unblock();
			self.workspace.sync_query();
			self.workspace.query.run();
		}, error: function(a, b, errorThrown) {
			self.workspace.unblock();
			var text = "";
			if (b && b.hasOwnProperty("responseText")) {
				text = b.responseText;
			}
			alert("Error drilling across. Check logs! " + text);
		}});
		this.close();

		return false;
	}



});
