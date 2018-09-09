sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"makejson/app/model/dateFormatter",
	"sap/m/Text",
	"sap/m/Input",
	"sap/m/Button"
], function (Controller, dateFormatter, Text, Input, Button) {
	"use strict";

	var oController = Controller.extend("makejson.app.controller.Detail", {});

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
			//oEntitySet = oModel.getProperty("/EntitySet"),
			aSetData = oModel.getProperty("/SetData");

		// If model is populated, show table. 
		if (aSetData) {
			this.populateTable(aSetData);

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
	oController.prototype.populateTable = function(aSetData) {

		var oTable = this.getView().byId("esTable");
		var self = this;
		var oFirstSet = aSetData[0];

		oTable.removeAllColumns();

		// Populate table columns
		for (var sKey in oFirstSet) {
			
			var sPropertyType = typeof(oFirstSet[sKey]);
			var sMinWidth = 200;
			var oInput = null;

			var oMenu = new sap.ui.unified.Menu({

				items: [
					new sap.ui.unified.MenuItem({
						text: "Replace column contents",
						select: this.onReplaceContentsPress.bind(this)
					})
				]
				
			})

			switch (sPropertyType) {

				case "boolean":
					oInput = new sap.m.CheckBox({selected: '{' + sKey + '}' });
					sMinWidth = 100;
					break;

				case "string":

					// Try parsing the first value of this field as a JSON format date
					var oDate = dateFormatter.parseDateFromJSON(oFirstSet[sKey]);
					if (oDate) {

						oInput = new sap.m.DateTimePicker({
							displayFormat:"short",
							value: {
								parts:[sKey],
								formatter: dateFormatter.parseDateFromJSON
							},
							change: this.onDateChange
						});
						sMinWidth = 250;
					
					} else {
						oInput = new Input({value:"{"+sKey+"}"})
					}
					break;
				
				default:
					oInput = new Text({text:"{"+sKey+"}"});
				
			}

			// Add column for this property, if it's a recognised type
			if (oInput) {

				var oColumn = new sap.ui.table.Column({
					label: new sap.m.Label({text: sKey}),
					minWidth: sMinWidth,
					autoResizable: true,
					resizable: true,
					template: [oInput],
					menu: oMenu
				})
	
				oTable.addColumn(oColumn)

			}

		}

	};

	/**
	 * Event handler converts date object from DateTime picker to JSON format string and stores it in model
	 * @param {jQuery.event} oEvent DateTime change event
	 */
	oController.prototype.onDateChange = function(oEvent) {
		var oSource = oEvent.getSource();
		var oDateTime = oSource.getDateValue();
		var sDateTime = dateFormatter.parseDateToJSON(oDateTime);
		var oBinding = oSource.getBinding("value");
		var sPath = oBinding.getContext().getPath() + "/" + oBinding.getPath();
		var oModel = oBinding.getModel();
		
		oModel.setProperty(sPath, sDateTime);

	};

	/**
	 * Event handler downloads table as JSON file
	 */
	oController.prototype.onDownloadPress = function() {
		var oModel = this.getView().getModel(),
			oSetData = oModel.getProperty("/SetData"),
			sSetName = oModel.getProperty("/EntitySetName");

		//Download.downloadObjectAsJson(oData.tableData, oData.title);
		//oObject.prototype.downloadObjectAsJson = function(oExportObj, sExportName) {

		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(oSetData, null,4));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href",     dataStr);
		downloadAnchorNode.setAttribute("download", sSetName + ".json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();	

	};

	oController.prototype.onFullScreenPress = function(oEvent) {

		var oComponent = this.getOwnerComponent(),
			oModel = oComponent.getModel(),
			sName = oModel.getProperty("/EntitySetName"),
			oRouter = oComponent.getRouter(),
			sLayout = oEvent.getParameter("pressed")? sap.f.LayoutType.MidColumnFullScreen : sap.f.LayoutType.TwoColumnsMidExpanded;

			oRouter.navTo("detail", {layout: sLayout, entitySet: sName});

	};

	oController.prototype.onReplaceContentsPress = function(oEvent) {

		var dialog = new sap.m.Dialog({
			title: "Replace contents",
			
			content: [
				new Text({
					text: "Enter new content template",
				}),
				new Input({
					value: "{/replaceContents}",
					submit: this.onReplaceTemplate
				}),
			],
			beginButton: new Button({
				text: 'Close',
				press: function () {
					dialog.close();
				},
			}),
			endButton: new Button({
				text: 'OK',
				press: this.onReplaceTemplate
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();

	};

	oController.prototype.onReplaceTemplate = function(oEvent) {
		console.log(oEvent);
	}

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
