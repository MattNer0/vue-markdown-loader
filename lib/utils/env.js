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
    class ENV {
        constructor() {
            this.isDebug = false;
            this.isTest = process.env.NODE_ENV === 'test' || false;
            this.isProduction = false;
        }
        setOptions(options) {
            Object.assign(this, options);
        }
    }
    return new ENV();
});
