(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    exports.isObject = (obj) => obj !== null && typeof obj === 'object';
    const _toString = Object.prototype.toString;
    const getObjectType = (x) => _toString.call(x).slice(8, -1);
    const isOfType = (type) => (x) => typeof x === type;
    const isObjectOfType = (type) => (x) => getObjectType(x) === type;
    exports.isFunction = isOfType('function');
    exports.isString = isOfType('string');
    exports.isBoolean = isOfType('boolean');
    exports.isPlainObject = isObjectOfType('Object');
    exports.isUndefined = isOfType('undefined');
    exports.isNull = (x) => x === null;
    exports.isNullOrUndefined = (x) => exports.isUndefined(x) || exports.isNull(x);
    exports.toRawType = (value) => _toString.call(value).slice(8, -1);
    exports.getType = function (fn) {
        const match = fn && fn.toString().match(/^\s*function (\w+)/);
        return match ? match[1] : '';
    };
    function toNaturalMultiTypesLanguage(types) {
        const len = types.length;
        if (len === 1) {
            return types.join('');
        }
        const rest = types.slice(0, len - 1);
        const last = types[len - 1];
        return rest.join(', ') + ' or ' + last;
    }
    function assertTypes(value, types) {
        let valid;
        let warnMsg;
        let actualType = exports.toRawType(value);
        const expectedTypes = [];
        if (actualType === 'AsyncFunction') {
            actualType = 'Function';
        }
        for (const type of types) {
            const expectedType = exports.getType(type);
            expectedTypes.push(expectedType);
            valid = actualType === expectedType;
            if (valid)
                break;
        }
        if (!valid) {
            warnMsg =
                `expected a ${chalk_1.default.green(toNaturalMultiTypesLanguage(expectedTypes))} ` + `but got ${chalk_1.default.yellow(actualType)}.`;
        }
        return { valid, warnMsg };
    }
    exports.assertTypes = assertTypes;
});
