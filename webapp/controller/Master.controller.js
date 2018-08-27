sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer"	
], function (JSONModel, Controller, MockServer) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Master", {

		onInit: function () {
			this.oView = this.getView();
			this.oProductsTable = this.getView().byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
		},

		onUploadChange: function(oEvent) {

			var oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
			
			if(oFile && window.FileReader){

				var oReader = new FileReader();

				if (oFile.type === "application/json") {
					oReader.onload = this._onJSONUploaded;
				} else if (oFile.type === "text/xml") {
					oReader.onload = this._onXMLUploaded;
				}

				oReader.readAsText(oFile);  
				   
			}
			
		},

		_onJSONUploaded: function(oEvent) {
			
			var sJSON= oEvent.target.result;
			var oJSON = JSON.parse(sJSON);
			console.log(oJSON);

		},

		_onXMLUploaded: function(oEvent) {
			
			var sXMLString= oEvent.target.result;
			alert(sXMLString);

				var oMockServer = new MockServer();

				oMockServer.simulate(sXMLString);
				console.log(oMockServer._mEntitySets);
		},

        onListItemPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: sap.f.LayoutType.TwoColumnsMidExpanded, product: product});
		}

		// onSearch: function (oEvent) {
		// 	var oTableSearchState = [],
		// 		sQuery = oEvent.getParameter("query");

		// 	if (sQuery && sQuery.length > 0) {
		// 		oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
		// 	}

		// 	this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		// },

		// onAdd: function () {
		// 	MessageBox.show("This functionality is not ready yet.", {
		// 		icon: MessageBox.Icon.INFORMATION,
		// 		title: "Aw, Snap!",
		// 		actions: [MessageBox.Action.OK]
		// 	});
		// },

		// onSort: function () {
		// 	this._bDescendingSort = !this._bDescendingSort;
		// 	var oBinding = this.oProductsTable.getBinding("items"),
		// 		oSorter = new Sorter("Name", this._bDescendingSort);

		// 	oBinding.sort(oSorter);
        // },

       
	});
}, true);
