sap.ui.define([
    "sap/ui/base/Object"
], function(Object){
    "use strict";

    var oObject = Object.extend("make.Download");

    oObject.prototype.downloadObjectAsJson = function(oExportObj, sExportName) {

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(oExportObj, null,4));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", sExportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

    }

    return oObject;
    
})
