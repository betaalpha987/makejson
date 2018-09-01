sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/UploadCollectionParameter",
], function (Controller, UploadCollectionParameter) {
	"use strict";

	var oController = Controller.extend("sap.ui.demo.fiori2.controller.Detail", {});

	oController.prototype.onInit = function() {
		var oRouter = this.getOwnerComponent().getRouter();
		oRouter.attachRouteMatched(this._onRouteMatched, this);
	};

	/**
	 * UI5 onRouteMatched event.
	 */
	oController.prototype._onRouteMatched = function(){
		var oComponent = this.getOwnerComponent();
		var oModel = oComponent.getModel();
		var oEntitySet = oModel.getProperty("/EntitySet");
		// If model is populated, show table. 
		if (oEntitySet) {
			console.log(oEntitySet);

		// If model not populated and layout is set to show Detail, route back to localhost
		} else {

			var sLayout = oModel.getProperty("/layout");
			if (sLayout !== "OneColumn") {

				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("master");
	
			}
		}

		// 
	};

	return oController;

});

	/**
	 *  Sets model and constructs table
	 */
	// oController.prototype.populateTable = function() {
	// 	debugger;
	// 	var sEntitySetName = oComponent.getEntitySet().name;
	// 	var oEntityProperties = oComponent.getEntityType().properties;
	// 	var oEntitySetData = oComponent.getEntitySetData();
	// 	var oView = this.getView();
	// 	var oTable = oView.byId("esTable");
	// 	var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance();
	// 	var self = this;

	// 	var oModel = oView.getModel();
	// 	oModel.setData({
	// 		title: sEntitySetName,
	// 		tableData: oEntitySetData
	// 	});

	// 	// Populate table columns
	// 	for (var sKey in oEntitySetData[0]) {
	// 		//aTitles.push(sKey);
	// 		var sPropertyType = this.getPropertyType(oEntityProperties,sKey);

	// 		var oInput = null;
	// 		switch (sPropertyType) {

	// 			case "String":
	// 				oInput = new sap.m.Input({value:"{"+sKey+"}"})
	// 				break;
	// 			case "Boolean":
	// 				oInput = new sap.m.CheckBox({selected: '{' + sKey + '}' });
	// 				break;
	// 			case "DateTime":
	// 				oInput = new sap.m.DateTimePicker({
	// 					displayFormat:"short",
	// 					value: {
	// 						parts:[sKey],
	// 						formatter: self.formatter.parseJSONDate
	// 					}
						
	// 				});
	// 		}
	// 		// <DateTimePicker
	// 		// id="DTP3"
	// 		// displayFormat="short"
	// 		// change="handleChange"/>

	// 		// Add column for this property, if it's a recognised type
	// 		if (oInput) {

	// 			var oColumn = new sap.ui.table.Column({
	// 				label: new sap.m.Label({text: sKey}),
	// 				minWidth: 200,
	// 				template: [oInput]
	// 			})
	
	// 			oTable.addColumn(oColumn)

	// 		}

	// 	}


	// };

	/**
	 * Get variable type from entity properties list
	 * @param {*} oEntityProperties 
	 * @param {*} sKey 
	 */
	// oController.prototype.getPropertyType = function(oEntityProperties,sKey) {

	// 	for (var i = 0; i < oEntityProperties.length; i++) {

	// 		if (sKey === oEntityProperties[i].name) {
	// 			return oEntityProperties[i].type;
	// 		}

	// 	}
	// 	return null;

	// };

	// /** 
	//  * Perform index operation
	//  */
	// function processIndex() {

	//     var form = document.getElementById("formIndex");
	//     var field = getField();
	//     var startingValue = form.elements["startAt"].value;
	//     var isString = form.elements["isString"].checked;
	//     var leadingZeroes = form.elements["leadingZeroes"].value;

	//     jsonArray.forEach(function (item) {

	//         if (item[field] || isNewField) {
	//             item[field] = typeof field === "string" ? value.toString() : value;
	//             value++;
	//         }

	//     });

	//     return (jsonArray);

	// }


// 	oController.prototype.onDownloadPressed = function(oEvent) {
// 		console.log(oEvent);
// 		var oView = this.getView();
// 		var oData = oView.getModel().getData();
// 		Download.downloadObjectAsJson(oData.tableData, oData.title);
// 	};

// 	oController.prototype.onColumnSelect = function (oEvent) {

// 		var oCurrentColumn = oEvent.getParameter("column");
// 		var oImageColumn = this.getView().byId("image");
// 		console.log(oEvent);

// 		if (oCurrentColumn === oImageColumn) {
// 			MessageToast.show("Column header " + oCurrentColumn.getLabel().getText() + " pressed.");
// 		}
// 	};

// 	oController.prototype.onColumnMenuOpen = function (oEvent) {

// 		var oCurrentColumn = oEvent.getSource();
// 		var oImageColumn = this.getView().byId("image");
// 		console.log(oEvent);

// 		if (oCurrentColumn != oImageColumn) {
// 			return;
// 		}

// 		//Just skip opening the column Menu on column "Image"
// 		oEvent.preventDefault();
// 	};

// 	return oController;

// });

		// onInit: function () {
		// 	this.oRouter = this.getOwnerComponent().getRouter();
		// 	this.oModel = this.getOwnerComponent().getModel();

		// 	this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
		// 	this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
		// },
		
		// _onProductMatched: function (oEvent) {
		// 	this._product = oEvent.getParameter("arguments").product || this._product || "0";
		// 	this.getView().bindElement({
		// 		path: "/ProductCollection/" + this._product,
		// 		model: "products"
		// 	});
		// },

		// onEditToggleButtonPress: function() {
		// 	var oObjectPage = this.getView().byId("ObjectPageLayout"),
		// 		bCurrentShowFooterState = oObjectPage.getShowFooter();

		// 	oObjectPage.setShowFooter(!bCurrentShowFooterState);
        // },

		// onExit: function () {
		// 	this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
		// 	this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		// }
