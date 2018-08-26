module.exports = function(grunt, config) {
    "use strict";

    return {
        "serve": function(mode) {

            var aTasks = [];//"configureProxies"];

            if (!mode || (mode !== 'src' && mode !== 'target')) {
				mode = 'src';
			}

            aTasks.push("connect:" + mode + ":keepalive");

            grunt.task.run(aTasks);

        },
        "lint": function(library, glob) {
            grunt.task.run(["eslint"]);
        }
    };

}