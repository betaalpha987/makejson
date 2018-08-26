sap.ui.define([], function() {
    "use strict";
    return {
        parseJSONDate: function(sDate) {
            return eval('new ' + sDate.replace(/\//g, ''));
        }
    }
})