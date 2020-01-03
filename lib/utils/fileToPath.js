(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isIndexFile"], factory);
    }
})(function (require, exports) {
    "use strict";
    const isIndexFile_1 = require("./isIndexFile");
    const extRE = /\.(vue|md)$/;
    return function fileToPath(file) {
        if (isIndexFile_1.isIndexFile(file)) {
            return file.replace(isIndexFile_1.indexRE, '/$1');
        }
        else {
            return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`;
        }
    };
});
