sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	var oController = Controller.extend("sap.ui.demo.fiori2.controller.App", {});
	
	oController.prototype.onInit = function () {
		this.oOwnerComponent = this.getOwnerComponent();
		this.oRouter = this.oOwnerComponent.getRouter();
		// this.oRouter.attachRouteMatched(this._onRouteMatched, this);
		this.oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
	};

	/**
	 * Determine column layout from URL pattern
	 */
	oController.prototype._onBeforeRouteMatched = function(oEvent) {
		var oModel = this.oOwnerComponent.getModel(),
			sLayout = oEvent.getParameters().arguments.layout;

		// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
		if (!sLayout) {
			sLayout = sap.f.LayoutType.OneColumn;
		}

		oModel.setProperty("/layout", sLayout);
	};

	return oController;
});


		// _onRouteMatched: function (oEvent) {
		// 	var sRouteName = oEvent.getParameter("name"),
		// 		oArguments = oEvent.getParameter("arguments");

		// 	// Save the current route name
		// 	this.currentRouteName = sRouteName;
		// 	this.currentProduct = oArguments.product;
		// },

		// onStateChanged: function (oEvent) {
		// 	var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
		// 		sLayout = oEvent.getParameter("layout");

		// 	// Replace the URL with the new layout if a navigation arrow was used
		// 	if (bIsNavigationArrow) {
		// 		this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct}, true);
		// 	}
		// },

		// onExit: function () {
		// 	this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		// 	this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		// }
