sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer"	
], function (JSONModel, Controller, MockServer) {
	"use strict";

	var oController = Controller.extend("sap.ui.demo.fiori2.controller.Master", {});

	oController.prototype.onInit = function () {

		// this.oView = this.getView();
		// this.oProductsTable = this.getView().byId("productsTable");
		this.oRouter = this.getOwnerComponent().getRouter();
		// this._bDescendingSort = false;
		this.mockServer = new MockServer();

		this.getView().setModel();

	};

	oController.prototype.onUploadChange = function(oEvent) {

		var oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
		
		if(oFile && window.FileReader){

			var oReader = new FileReader();

			if (oFile.type === "application/json") {
				oReader.onload = this._onJSONUploaded;
			} else if (oFile.type === "text/xml") {
				oReader.onload = this._onXMLUploaded.bind(this);
			}

			oReader.readAsText(oFile);  
				
		}
		
	};

	oController.prototype._onJSONUploaded = function(oEvent) {
		
		var sJSON= oEvent.target.result;
		var oJSON = JSON.parse(sJSON);
		console.log(oJSON);

	};

	oController.prototype._onXMLUploaded = function(oEvent) {
		
		var sXMLString= oEvent.target.result;
		var oModel = this.getView().getModel();

		this.mockServer.simulate(sXMLString);
		oModel.setProperty("/EntitySets", this.mockServer._mEntitySets);

	};

	oController.prototype.onListItemPress = function (oEvent) {

		var oContext = oEvent.getSource().getBindingContext(),
			oModel = oContext.oModel,
			oEntitySet = oModel.getProperty(oContext.sPath),
			aSetData = this.mockServer.getEntitySetData(oEntitySet.name);

			oModel.setProperty("/EntitySet",oEntitySet);
			oModel.setProperty("/SetData",aSetData);

		this.oRouter.navTo("detail", {layout: sap.f.LayoutType.TwoColumnsMidExpanded, entitySet: oEntitySet.name});
	}

	return oController;

});
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

       
