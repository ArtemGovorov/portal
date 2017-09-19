//{CODE:CGE02}
// di.core.global.exception
define([
    '../utility/util'
],
function (util) {
    'use strict';

    throwIfNullOrUndefined('CGE0202E', util, 'util');

    /** Guard object with methods for validating values and throwing di exceptions with source */
    window.$di.exception.guard = {
        getNewError: getNewError,
        throwNew: throwNew,
        throwIf: throwIf,
        throwIfNull: throwIfNull,
        throwIfUndefined: throwIfUndefined,
        throwIfNullOrUndefined: throwIfNullOrUndefined,
        throwIfNotAnObject: throwIfNotAnObject,
        throwIfNotANumber: throwIfNotANumber,
        throwIfZero: throwIfZero,
        throwIfNegative: throwIfNegative,
        throwIfZeroOrNegative: throwIfZeroOrNegative,
        throwIfDecimal: throwIfDecimal,
        throwIfNotAString: throwIfNotAString,
        throwIfEmptyString: throwIfEmptyString,
        throwIfInvalidId: throwIfInvalidId,
        throwIfNotAFunction: throwIfNotAFunction,
        throwIfNotArray: throwIfNotArray,
        throwIfEmptyArray: throwIfEmptyArray,
        reThrow: reThrow
    };

    return window.$di.exception.guard;

    /**
     * Generate a new di exception
     * @param source
     * @param message
     * @returns
     */
    function getNewError(source, message) {
        var err = new Error(message);

        err.source = source;

        return err;
    }

    /**
     * Throw a new exception
     * @param {string} source Exception source
     * @param {string} message Exception message
     * @returns
     */
    function throwNew(source, message)
    {
        var err = getNewError(source, message);

        throw err;
    }

    /**
     * Throw an exception if condition is true
     * @param {string} source Exception source
     * @param {bool} condition Whether or not to throw the exception
     * @param {string} message Exception message
     */
    function throwIf(source, condition, message) {
        if (condition) {
            throwNew(source, message);
        }
    }

    /**
     * Throw an exception if the given value is [null]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNull(source, value, valueName) {
        throwIf(source, util.isNull(value), valueName + " is null");
    }

    /**
     * Throw an exception if the given value is [undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfUndefined(source, value, valueName) {
        throwIf(source, util.isUndefined(value), valueName + " is undefined");
    }

    /**
     * Throw an exception if the given value is [null] or [undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNullOrUndefined(source, value, valueName) {
        throwIfNull(source, value, valueName);
        throwIfUndefined(source, value, valueName);
    }

    /**
     * Throw an exception if the given value is not an object
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNotAnObject(source, value, valueName) {
        throwIfNullOrUndefined(source, value, valueName);
        throwIf(source, !util.isObject(value), valueName + " is not an object");
    }

    /**
     * Throw an exception if the given value is not a numeric data type
     * or is [null]/[undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNotANumber(source, value, valueName) {
        throwIfNullOrUndefined(source, value, valueName);
        throwIf(source, !util.isNumber(value), valueName + " is not a number");
    }

    /**
     * Throw an exception if the given value is not a numeric data type
     * or is zero
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfZero(source, value, valueName) {
        throwIfNotANumber(source, value, valueName);
        throwIf(source, value === 0, valueName + " is zero");
    }

    /**
     * Throw an exception if the given value is not a numeric data type
     * or is negative
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNegative(source, value, valueName) {
        throwIfNotANumber(source, value, valueName);
        throwIf(source, value < 0, valueName + " is negative");
    }

    /**
     * Throw an exception if the given value is not a numeric data type
     * or is zero or is negative
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfZeroOrNegative(source, value, valueName) {
        throwIfZero(source, value, valueName);
        throwIfNegative(source, value, valueName);
    }

    /**
     * Throw an exception if the given value is not a numeric data type
     * or is decimal
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfDecimal(source, value, valueName) {
        throwIfNotANumber(source, value, valueName);
        throwIf(source, util.isDecimalNumber(value), valueName + " is decimal");
    }

    /**
     * Throw an exception if the given value is not a string
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNotAString(source, value, valueName) {
        throwIfNullOrUndefined(source, value, valueName);
        throwIf(source, !util.isString(value), valueName + " is not a string");
    }

    /**
     * Throw an exception if the given value is an empty string
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfEmptyString(source, value, valueName) {
        throwIfNotAString(source, value, valueName);
        throwIf(source, value == '', valueName + " is an empty string");
    }

    /**
     * Throw an exception if the given value is not a positive integer data type
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfInvalidId(source, value, valueName) {
        try {
            throwIfDecimal(source, value, valueName);
            throwIfZeroOrNegative(source, value, valueName);
        } catch (e) {
            reThrow(source, e, valueName + " is not a valid ID");
        }
    }

    /**
     * Throw an exception if the given value is not a function
     * or is [null]/[undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNotAFunction(source, value, valueName) {
        throwIfNullOrUndefined(source, value, valueName);
        throwIf(source, !util.isFunction(value), valueName + " is not a function");
    }

    /**
     * Throw an exception if the given value is not an array
     * or is [null]/[undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfNotArray(source, value, valueName) {
        throwIfNullOrUndefined(source, value, valueName);
        throwIf(source, !util.isArray(value), valueName + " is not an array");
    }

    /**
     * Throw an exception if the given value is an empty array
     * or is [null]/[undefined]
     * @param {string} source Exception source
     * @param value Value to check
     * @param {string} valueName Name of the argument or property being checked
     */
    function throwIfEmptyArray(source, value, valueName) {
        throwIfNotArray(source, value, valueName);
        throwIf(source, value.length == 0, valueName + " is an empty array");
    }

    /**
     * Throw a new exception containing the given exception as the innerException
     * @param {string} source Exception source
     * @param {Error} ex
     * @param {string} message Exception message
     */
    function reThrow(source, ex, message) {
        var err = getNewError(source, message);
        
        err.innerException = ex;
        
        throw err;
    }
});