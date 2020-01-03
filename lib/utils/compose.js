(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return function compose(...processors) {
        if (processors.length === 0)
            return (input) => input;
        if (processors.length === 1)
            return processors[0];
        return processors.reduce((prev, next) => {
            return (...args) => next(prev(...args));
        });
    };
});
