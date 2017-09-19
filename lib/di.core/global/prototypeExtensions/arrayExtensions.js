//{CODE:CGP02}
// di.core.global.prototypeExtensions
define(function () {
    'use strict';

    Array.prototype.pushArray = pushArray;
    Array.prototype.clear = clear;
    Array.prototype.fill = fill;
    
    return;

    function pushArray() {
        this.push.apply(this, this.concat.apply([], arguments));
    }

    function clear() {
        this.length = 0;
    }

    function fill() {
        this.clear();
        this.pushArray.apply(this, arguments);
    }
});