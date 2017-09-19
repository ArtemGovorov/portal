//{CODE:CGU08}
// di.core.global.utility.placeholders.arguments
define([
    '../../../exception/guard'
], function (guard) {
    'use strict';

    var DELIMITER = ',';
    var OPEN_BRACE = '{';
    var CLOSE_BRACE = '}';

    window.$di.utility.placeholders.arguments.split = split;

    return window.$di.utility.placeholders.arguments.split;

    /**
     * Provides the ability to split arguments used in conjunction with the di-translate directive.
     * @param argumentString
     */
    function split(argumentString) {
        guard.throwIfNullOrUndefined("CGU0801E", argumentString, "argumentString");

        var chunks = [];
        var insideBraces = false;
        var lastChunkIndex = 0;

        for (var i = 0; i < argumentString.length; i++) {
            if (argumentString[i] === OPEN_BRACE) {
                insideBraces = true;
            }

            if (insideBraces && argumentString[i] == CLOSE_BRACE) {
                insideBraces = false;
            }

            if (!insideBraces && argumentString[i] === DELIMITER) {
                chunks.push(argumentString.substring(lastChunkIndex, i).trim());
                lastChunkIndex = i + 1;
            }
        }

        // whatever is remaining is unlikely to be an object - push it onto the queue
        if (lastChunkIndex < i) {
            chunks.push(argumentString.substring(lastChunkIndex, i).trim());
        }

        return chunks;
    };
});