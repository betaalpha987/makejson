sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text"
], function (JSONModel, Controller, MockServer, Dialog, Button, Text) {
	"use strict";

	var oController = Controller.extend("makejson.app.controller.Master", {});

	oController.prototype.onInit = function () {

		// this.oView = this.getView();
		// this.oProductsTable = this.getView().byId("productsTable");
		var oComponent = this.getOwnerComponent();
		var oModel = oComponent.getModel();
		oModel.setData({
			ESListTableVisible: false
		});
		this.oRouter = oComponent.getRouter();
		// this._bDescendingSort = false;

	};

	oController.prototype.onHelpIconPress = function() {
		this.showDialog(
			'None',
			'Upload XML or JSON',
			'Upload a metadata.xml file to automatically generate, edit and save sample mockdata JSON for your UI5 OPA5 tests.\n\nUpload a mockdata JSON file to edit it and save your changes.'
		)
	};

	oController.prototype.showDialog = function(sState, sTitle, sText) {
		var dialog = new Dialog({
			title: sTitle,
			type: "Message",
			state: sState,
			content: new Text({
				text: sText
			}),
			beginButton: new Button({
				text: 'OK',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();

	};

	oController.prototype.onUploadChange = function(oEvent) {

		var oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
		
		if(oFile && window.FileReader){

			var oReader = new FileReader();

			if (oFile.type === "application/json") {
				var sName = oFile.name.split(".")[0];
				oReader.onload = this._onJSONUploaded.bind(this, sName);
			} else if (oFile.type === "text/xml") {
				oReader.onload = this._onXMLUploaded.bind(this);
			}

			oReader.readAsText(oFile);  
				
		}
		
	};

	oController.prototype._onJSONUploaded = function(sName, oEvent) {
		
		var sJSON= oEvent.target.result,
			aJSON,
			oModel = this.getView().getModel();

		oModel.setProperty("/ESListTableVisible", false);

		try {
			 aJSON = JSON.parse(sJSON);
		}
		catch {
			this.showDialog("Error", "JSON file read error", "File could not be parsed.");
			return;
		}

		// Check JSON shows the basic characteristics of a mockdata array containing objects
		if (!Array.isArray(aJSON) ||
			Array.isArray(aJSON[0]) ||
			typeof(aJSON[0]) !=='object' ) {
			this.showDialog("Error", "JSON structure error", "JSON must be composed of an array containing one or more objects.");
			return;
		}

		oModel.setProperty("/EntitySetName", sName);
		oModel.setProperty("/SetData",aJSON);

		this.oRouter.navTo("detail", {layout: sap.f.LayoutType.TwoColumnsMidExpanded, entitySet: sName});

	};

	oController.prototype._onXMLUploaded = function(oEvent) {
		
		var sXMLString= oEvent.target.result,
			oModel = this.getView().getModel(),
			self = this;

		function fError(){
			self.showDialog("Error", "XML parse error", "Couldn't parse XML file for generating mockdata.");
		}

		// Attempt to make MockServer create entity sets from XML file
		try {
			if (this.mockServer) {
				this.mockServer.destroy();
				oModel.setProperty("/ESListTableVisible", false);
			}
			this.mockServer = new MockServer();
			this.mockServer.simulate(sXMLString);
		}
		catch {
			fError();
			return;
		}
		if (!this.mockServer._mEntitySets) {
			fError();
			return;
		}
		oModel.setProperty("/EntitySets", this.mockServer._mEntitySets);
		oModel.setProperty("/ESListTableVisible", true);
	};

	oController.prototype.onListItemPress = function (oEvent) {

		var oContext = oEvent.getSource().getBindingContext(),
			oModel = oContext.oModel,
			oEntitySet = oModel.getProperty(oContext.sPath),
			sName = oEntitySet.name,
			aSetData = this.mockServer.getEntitySetData(sName);

			oModel.setProperty("/EntitySetName", sName);
			oModel.setProperty("/SetData", aSetData);

		this.oRouter.navTo("detail", {layout: sap.f.LayoutType.TwoColumnsMidExpanded, entitySet: sName});
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

       
