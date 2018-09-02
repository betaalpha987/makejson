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

		var oComponent = this.getOwnerComponent(),
			oModel = oComponent.getModel(),
			oEntitySet = oModel.getProperty("/EntitySet"),
			aSetData = oModel.getProperty("/SetData");

		// If model is populated, show table. 
		if (aSetData) {
			this.populateTable(oEntitySet, aSetData);

		// If model not populated and layout is set to show Detail, route back to localhost
		} else {

			var sLayout = oModel.getProperty("/layout");
			if (sLayout !== "OneColumn") {

				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("master");
	
			}

		}

	};

	/**
	 *  Sets model and constructs table
	 */
	oController.prototype.populateTable = function(oEntitySet, aSetData) {

		var oEntityProperties = oEntitySet.keysType;
		var oTable = this.getView().byId("esTable");
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance();
		var self = this;

		// Populate table columns
		for (var sKey in aSetData[0]) {
			//aTitles.push(sKey);
			var sPropertyType = this.getPropertyType(oEntityProperties,sKey);

			var oInput = null;
			switch (sPropertyType) {

				case "Boolean":
					oInput = new sap.m.CheckBox({selected: '{' + sKey + '}' });
					break;
				case "DateTime":
					oInput = new sap.m.DateTimePicker({
						displayFormat:"short",
						value: {
							parts:[sKey],
							formatter: self.formatter.parseJSONDate
						}
					});
					break;
				case "String":
					oInput = new sap.m.Input({value:"{"+sKey+"}"})
					break;

			}
			// <DateTimePicker
			// id="DTP3"
			// displayFormat="short"
			// change="handleChange"/>

			// Add column for this property, if it's a recognised type
			if (oInput) {

				var oColumn = new sap.ui.table.Column({
					label: new sap.m.Label({text: sKey}),
					minWidth: 200,
					template: [oInput]
				})
	
				oTable.addColumn(oColumn)

			}

		}

	};

	/**
	 * Get variable type from entity properties list
	 * @param {*} oEntityProperties 
	 * @param {*} sKey 
	 */
	oController.prototype.getPropertyType = function(oEntityProperties,sKey) {

		for (var i = 0; i < oEntityProperties.length; i++) {

			if (sKey === oEntityProperties[i].name) {
				return oEntityProperties[i].type;
			}

		}
		return null;

	};

	// oController.prototype.onDownloadPress = function(oEvent) {
	// 	console.log(oEvent);
	// 	var oView = this.getView();
	// 	var oData = oView.getModel().getData();
	// 	Download.downloadObjectAsJson(oData.tableData, oData.title);
	// };

	oController.prototype.onFullScreenPress = function(oEvent) {

		var oComponent = this.getOwnerComponent(),
			oModel = oComponent.getModel(),
			sName = oModel.getProperty("/EntitySet/name"),
			oRouter = oComponent.getRouter(),
			sLayout = oEvent.getParameter("pressed")? sap.f.LayoutType.MidColumnFullScreen : sap.f.LayoutType.TwoColumnsMidExpanded;

			oRouter.navTo("detail", {layout: sLayout, entitySet: sName});

	};



	return oController;

});


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
