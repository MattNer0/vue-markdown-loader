(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "os"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const os_1 = tslib_1.__importDefault(require("os"));
    class Performance {
        constructor() {
            this._totalMemory = os_1.default.totalmem();
        }
        start() {
            this._startTime = Date.now();
            this._startFreeMemory = os_1.default.freemem();
        }
        stop() {
            this._endTime = Date.now();
            this._endFreeMemory = os_1.default.freemem();
            return {
                duration: this._endTime - this._startTime,
                memoryDiff: this._endFreeMemory - this._startFreeMemory,
            };
        }
    }
    return new Performance();
});
