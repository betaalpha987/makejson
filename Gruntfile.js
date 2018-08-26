var path = require('path');

module.exports = function(grunt) {
    "use strict";

    require("load-grunt-config")(grunt, {
        configPath: path.join(process.cwd(), "grunt"),
        jitGrunt: {
            staticMappings: {
                "openui5_preload": "grunt-openui5"
            }
        }
    });

};