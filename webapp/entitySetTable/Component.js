sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.m.sample.SplitApp.Component", {

		metadata : {
			rootView : "make.entitySetTable.EntitySetTable",
			dependencies : {
				libs : [
					"sap.m"
				]
			},
			config : {
				sample : {
					files : [
						"make.entitySetTable.EntitySetTable.view.xml",
						"make.entitySetTable.EntitySetTable.controller.js"
					]
				}
			},
			properties : {
				entitySet: "object",
				entityType: "object",
				entitySetData: "object"
			}

		}
	});

	return Component;

});
