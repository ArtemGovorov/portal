//{CODE:CGD01}
// di.core.global.debug
define([
    '../utility/util'
],
function (util) {
    'use strict';

    /** debug helper */
    window.$di.debug.debugger = {
        enabled: false,
        log: log,
        newLogger: newLogger,
        breakHere: breakHere
    };

    return window.$di.debug.debugger;

    /**
     * logs to the console
     * @param data
     * @returns
     */
    function log(data, logContext) {
        if (window.$di.debug.debugger.enabled) {
            var logData;

            if (!logContext) {
                logData = data;
            } else {
                logData = {
                    _logContext: logContext,
                    data: data
                };
            }

            console.log(logData);
        }
    }

    /**
     * returns a new logging object which adds context information to each log
     * @param logContext
     */
    function newLogger(logContext) {
        return {
            log: function (data) {
                log(data, logContext);
            }
        };
    }

    /**
     * adds breakpoint
     */
    function breakHere(condition) {
        if (this.enabled && (!util.isDefined(condition) || condition)) {
            debugger;
        }
    }
});