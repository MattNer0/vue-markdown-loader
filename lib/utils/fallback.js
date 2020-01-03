(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "fs-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
    function fsExistsFallback(files) {
        for (const file of files) {
            if (fs_extra_1.default.existsSync(file)) {
                return file;
            }
        }
    }
    exports.fsExistsFallback = fsExistsFallback;
});
