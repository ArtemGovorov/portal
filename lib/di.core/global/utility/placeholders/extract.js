//{CODE:CGU05}
// di.core.global.utility
define([
    '../../exception/guard'
], function (guard) {
    'use strict';

    var _pattern = /<%=([\s.a-zA-Z0-9]+)%>/g;

    window.$di.utility.placeholders.extract = extract;

    return window.$di.utility.placeholders.extract;

    /**
     * Extracts a collection of placeholders in the format of <%= xxx %> from the target string
     * @param placeholderString
     */
    function extract(placeholderString) {
        guard.throwIfNotAString("CGU0501E", placeholderString, "placeholderString");
        var matches = _pattern.exec(placeholderString);
        var ms = [];

        while (matches != null) {
            for (var i = 1; i < matches.length; i++) {
                ms.push(matches[i].trim());
            }

            matches = _pattern.exec(placeholderString);
        }

        return ms;
    };
});