//{CODE:CGU01}
// di.core.global.utility
define(function () {
    'use strict';

    window.$di.utility.util = {
    	isArray: isArray,
		isNonEmptyArray: isNonEmptyArray,
        isBoolean: isBoolean,
        isNull: isNull,
        isNullOrUndefined: isNullOrUndefined,
        isNumber: isNumber,
        isDecimalNumber: isDecimalNumber,
        isString: isString,
        isNonEmptyString: isNonEmptyString,
        isSymbol: isSymbol,
        isUndefined: isUndefined,
        isRegExp: isRegExp,
        isObject: isObject,
        isEmptyObject: isEmptyObject,
        isRealObject: isRealObject,
        isDate: isDate,
        isError: isError,
        isFunction: isFunction,
        isPrimitive: isPrimitive,
        isDefined: isDefined,
        extend: extend,
        isAnyObjectPropertyDefined: isAnyObjectPropertyDefined,
        toSnakeCase: toSnakeCase,
        hasValue: hasValue
    };

    return window.$di.utility.util;

    function isArray(arg) {
        return !isNullOrUndefined(arg) && Array.isArray(arg);
    }

    function isNonEmptyArray(arg) {
    	return isArray(arg) && arg.length > 0;
    }

    function isBoolean(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'boolean';
    }
    
    function isNull(arg) {
        return arg === null;
    }

    function isNullOrUndefined(arg) {
        return isNull(arg) || isUndefined(arg);
    }

    function isNumber(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'number';
    }

    function isDecimalNumber(arg) {
        return isNumber(arg) && Math.floor(arg) != arg;
    }

    function isString(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'string';
    }

    function isNonEmptyString(arg) {
        return isString(arg) && arg !== '';
    }

    function isSymbol(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'symbol';
    }

    function isUndefined(arg) {
        return arg === void 0;
    }

    function isRegExp(arg) {
        return isObject(arg) && objectToString(arg) === '[object RegExp]';
    }

    function isObject(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'object';
    }

    function isEmptyObject(arg) {
        if (!isObject(arg)) {
            return false;//false result implies arg is non empty object, not that it is not an object
        }

        var name;

        for (name in arg) {
            return false;
        }

        return true;
    }

    function isRealObject(arg) {
        return !isNullOrUndefined(arg) && isObject(arg) && !isEmptyObject(arg);
    }

    function isDate(arg) {
        return isObject(arg) && objectToString(arg) === '[object Date]';
    }

    function isError(arg) {
        return isObject(arg) &&
            (objectToString(arg) === '[object Error]' || arg instanceof Error);
    }

    function isFunction(arg) {
        return !isNullOrUndefined(arg) && typeof arg === 'function';
    }

    function isPrimitive(arg) {
        return arg === null ||
               typeof arg === 'boolean' ||
               typeof arg === 'number' ||
               typeof arg === 'string' ||
               typeof arg === 'symbol' ||  // ES6 symbol
               typeof arg === 'undefined';
    }

    function objectToString(o) {
        return Object.prototype.toString.call(o);
    }

    function isDefined() {
        for (var argI = 0; argI < arguments.length; ++argI) {
            if (isUndefined(arguments[argI])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Copies properties from source to destination object
     * If any properties are an array, the array is emptied and filled with the items from source
     * to preserve any references to the array property
     * @param dest
     * @param source
     */
    function extend(dest, source) {
        if (!isObject(source)) {
            return;
        }

        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
            	if (isArray(source[attr])) {
            		if (isArray(dest[attr]) === false){
			            dest[attr] = [];
		            }
                    dest[attr].fill(source[attr]);
                } else {
                    dest[attr] = source[attr];
                }
            }
        }
    }

    function isAnyObjectPropertyDefined(arg, ignoredProperties) {
    	if (!isObject(arg)) {
    		return false;
    	}

    	if (!isNonEmptyArray(ignoredProperties)) {
    		ignoredProperties = [];
    	}

    	for (var property in arg) {
    		if (arg.hasOwnProperty(property)
				&& !isNullOrUndefined(arg[property])
				&& arg[property] !== ''
				&& !contains(ignoredProperties, property)) {
    			return true;
    		}
    	}

    	return false;

    	function contains(arrhaystack, needle) {
    		return (arrhaystack.indexOf(needle) > -1);
    	}
    }
    
    function toSnakeCase(name, separator) {
        separator = separator || '_';
        return name.replace(/[A-Z]/g,
            function (letter, pos) {
                return (pos ? separator : '') + letter.toLowerCase();
            });
    }

    function hasValue() {
        for (var argI = 0; argI < arguments.length; ++argI) {
            if (isNullOrUndefined(arguments[argI])) {
                return false;
            }
        }

        return true;
    }
});