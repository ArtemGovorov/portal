// https://github.com/wallabyjs/public/issues/726
var Module = require('module').Module;
var modulePrototype = Module.prototype;
var originalRequire = modulePrototype.require;
modulePrototype.require = function (filePath) {
    if (filePath === 'source-map-support') {
        return { install: () => { } };
    }
    return originalRequire.call(this, filePath);
};

module.exports = require('./wallaby.config.js');