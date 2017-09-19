//{CODE:NAM01}
// di.core.global.event
define([
    'jquery'
],
function ($) {
    'use strict';
    var valListenerAdded = false;

    window.$di.event.jqueryEventSubscriber = {
        listenToVal: listenToVal
    };

    return window.$di.event.jqueryEventSubscriber;

    function listenToVal() {
        if (valListenerAdded) {
            return;
        }

        var originalVal = $.fn.val;

        $.fn.val = function () {
            var result = originalVal.apply(this, arguments);

            if (arguments.length > 0) {
                $(this).trigger('val');
            }

            return result;
        };

        valListenerAdded = true;
    }
});