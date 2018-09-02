sap.ui.define([], function() {
    "use strict";
    return {
        /**
         * Return a version of the string that can be readily converted to a date by a DateTime input control
         * or null if the string cannot be converted.
         */
        parseJSONDate: function(sDate) {
            try {
                return eval('new ' + sDate.replace(/\//g, ''));
            }
            catch {
                return null;
            }
        }
    }
})