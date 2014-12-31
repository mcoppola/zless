var util = require(__dirname + '/../lib/util.js'),
    path = require('path'),
    mustache = require('mu2');

module.exports = function (express, app) {

    // Common configuration
    app.configure(function () {

        // Configure mustache template engine
        mustache.root = __dirname + '/../views';
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'mustache');
        app.engine('mustache', function (path, options, fn) {
            var buffer = [];

            // Always recompile in development
            if (app.settings.env === 'development') {
                mustache.clearCache();
            }
            mustache.compileAndRender(path, options).on('data', function (data) {
                buffer.push(data);
            }).on('end', function () {
                fn(null, buffer.join(''));
            }).on('error', function (e) {
                fn(e);
            });
        });

        

        // Make sure build folders exist
        app.use(require('less-middleware')(path.join(__dirname, '../public')));
        app.use(express.static(path.join(__dirname, '../public')));

        app.use(app.router);
    });

    // Development specific configuration
    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // Production specific configuration
    app.configure('production', function () {
        app.use(express.errorHandler());
    });

};