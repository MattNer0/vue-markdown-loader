(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "upath"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const upath_1 = tslib_1.__importDefault(require("upath"));
    return function toAbsolutePath(raw, cwd = process.cwd()) {
        if (upath_1.default.isAbsolute(raw)) {
            return raw;
        }
        return upath_1.default.resolve(cwd, raw);
    };
});
