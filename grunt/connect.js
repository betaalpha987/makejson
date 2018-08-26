module.exports = function(grunt, config) {
    "use strict";

    var connect = {
        options: {
            hostname: "localhost",
            port: "8080"/*,
            middleware: function(connect, options, defaultMiddleware) {
                var aMiddlewares = [];
                aMiddlewares.push(require("grunt-connect-proxy/lib/utils").proxyRequest);
                aMiddlewares.push(defaultMiddleware);
                return aMiddlewares;
            }*/
        },
        src: {
            options: {
                base: ["./webapp"]
            }            
        },
        target: {            
        }
    };

    return connect;

}