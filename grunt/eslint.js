module.exports = function(grunt, config) {
    "use strict";

    var quiet = grunt.option("quiet");
    if (quiet !== false) {
        quiet = true;
    }

    var eslint = {
        options: {
            quiet: quiet,
            fix: true
        },
        webapp: "./webapp"
	};

    return eslint;

};