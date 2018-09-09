sap.ui.define([], function() {
    "use strict";
    return {
        /**
         * Return a version of the string that can be readily converted to a date by a DateTime input control
         * or null if the string cannot be converted.
         */
        parseDateFromJSON: function(sDateTime) {
            try {
                return eval('new ' + sDateTime.replace(/\//g, ''));
            }
            catch {
                return null;
            }
        },

        parseDateToJSON: function(oDateTime) {
            try {
                var sUTC = Date.parse(oDateTime);
                return "/Date(" + sUTC + ")/"
            }
            catch {
                return null
            }
        }
    }
})