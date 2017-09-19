//{CODE:CGU09}
// di.core.global.utility.placeholders.arguments
define([
    '../../../exception/guard'
], function (guard) {
    'use strict';

    window.$di.utility.placeholders.arguments.map = map;

    return window.$di.utility.placeholders.arguments.map;

    /**
     * Maps arguments to pre-defined placeholders.
     * @param targets
     * @param args
     */
    function map(targets, args) {
        guard.throwIfNullOrUndefined("CGU0901E", targets, "targets");
        guard.throwIfNullOrUndefined("CGU0902E", args, "args");

        var mapped = {};
        var unmapped = [];

        // try to map named arguments first
        for (var i = 0; i < args.length; i++) {
            try {
                var obj = eval('(' + args[i] + ')');
                if (typeof obj === typeof {}) {
                    for (var arg in obj) {
                        mapped[arg] = obj[arg];
                    }
                }
                else if (typeof obj === typeof '') {
                    mapped[arg] = obj;
                }
                else {
                    throw obj;
                }
            }
            catch (error) {
                unmapped.unshift(args[i]);
            }
        }

        // map any unmapped arguments in the order that they are found in
        for (i = 0; i < targets.length; i++) {
            if (mapped[targets[i]] === undefined) {
                var popped = unmapped.pop();
                // assigns the key as the value if it's still undefined
                if (popped === undefined) {
                    var s = targets[i];
                    s = s.replace(/\./g, '_');
                    mapped[s] = targets[i];
                }
                else {
                    mapped[targets[i]] = popped;
                }
            }
        }

        return mapped;
    };
});