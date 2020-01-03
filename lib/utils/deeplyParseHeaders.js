(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./compose", "./parseHeaders", "./removeNonCodeWrappedHTML"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const compose_1 = tslib_1.__importDefault(require("./compose"));
    const parseHeaders_1 = tslib_1.__importDefault(require("./parseHeaders"));
    const removeNonCodeWrappedHTML_1 = tslib_1.__importDefault(require("./removeNonCodeWrappedHTML"));
    return compose_1.default(removeNonCodeWrappedHTML_1.default, parseHeaders_1.default);
});
