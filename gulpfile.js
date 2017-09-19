var gulp = require('gulp');
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var del = require('del');
var KarmaServer = require('karma').Server;

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var jsonFileAggregatorPath = '"%BUILD_UTILS%\\Json File Aggregator\\JsonFileAggregator.Application.exe"';
var jsonFileAggregatorExec = jsonFileAggregatorPath + ' --root "{rootFolder}" --config \\language-config.json';

gulp.task("@build-dev", ["@buildLanguage", "webpack:build-dev"], function () {
    gulp.watch(["src/app/**/*"], ["webpack:build-dev"]);
});

gulp.task("@build", ["@buildLanguage", "webpack:build"]);

gulp.task("webpack:build", function (callback) {
    var webpackConfigProd = require("./webpack.config.prod.js");
    var myConfig = Object.create(webpackConfigProd);

    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build-dev", function (callback) {
    var webpackConfigDev = require("./webpack.config.dev.js");
    var myDevConfig = Object.create(webpackConfigDev);
    myDevConfig.devtool = "source-map";

    var devCompiler = webpack(myDevConfig);

    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("@webpack-dev-server", function (callback) {
    var webpackConfigDev = require("./webpack.config.dev.js");
    var myConfig = Object.create(webpackConfigDev);
    myConfig.devtool = "eval";

    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('@buildLanguage', function (callback) {
    var appLanguageCommand = jsonFileAggregatorExec.replace('{rootFolder}', path.resolve('./'));

    var config = {
        FilePattern: '_language.json',
        OutputFilePath: path.join(path.resolve('./src'), 'languages\\'),
        OutputFileName: 'en-us.json',
        FileSeparator: ','
    }

    del.sync(path.resolve('build\\languages\\'));

    fs.writeFileSync('language-config.json', JSON.stringify(config));

    exec(appLanguageCommand, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        callback(err);
    });
});

gulp.task('@test', function (callback) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, callback).start();
});

gulp.task('@test-debug', function (callback) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['Chrome']
    }, callback).start();
});