//{CODE:CGU04}
// di.core.global.utility
define([
    './extract',
    './arguments/map',
    '../../exception/guard',
    '../util'
], function (extract, map, guard, util) {
    'use strict';

    window.$di.utility.placeholders.replace = replace;

    return window.$di.utility.placeholders.replace;

    /**
     * Replaces any placeholders found in a given string with the arguments provided.
     * @param placeholderString
     * @param args
     */
    function replace(placeholderString, args, argumentFilter) {
        guard.throwIfNullOrUndefined("CGU0401E", placeholderString, "placeholderString");
        guard.throwIfNullOrUndefined("CGU0402E", args, "args");

        var placeholders = extract(placeholderString);
        var mappedArguments;
        var filteredArguments;
        var replacing;

        placeholders = extract(placeholderString);
        mappedArguments = map(placeholders, args);

        if (util.isObject(args) && !util.isArray(args)) {
            mappedArguments = args;
        } else {
            mappedArguments = map(placeholders, args);
        }

        if (argumentFilter) {
            filteredArguments = argumentFilter(mappedArguments);
        } else {
            filteredArguments = mappedArguments;
        }

        placeholderString = placeholderString.replace(/<%=([\s.a-zA-Z0-9]+)%>/g, function (str) {
            return str.replace(/\./g, '_');
        });

        replacing = _.template(placeholderString);


        return replacing(filteredArguments);
    }
});