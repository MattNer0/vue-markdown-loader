(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "diacritics"], factory);
    }
})(function (require, exports) {
    "use strict";
    const diacritics_1 = require("diacritics");
    const rControl = /[\u0000-\u001f]/g;
    const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
    return function slugify(str) {
        return (diacritics_1.remove(str)
            .replace(rControl, '')
            .replace(rSpecial, '-')
            .replace(/-{2,}/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/^(\d)/, '_$1')
            .toLowerCase());
    };
});
