(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./deeplyParseHeaders"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const deeplyParseHeaders_1 = tslib_1.__importDefault(require("./deeplyParseHeaders"));
    return function (frontmatter, strippedContent) {
        if (frontmatter.home) {
            return 'Home';
        }
        if (frontmatter.title) {
            return deeplyParseHeaders_1.default(frontmatter.title);
        }
        const match = strippedContent.trim().match(/^#+\s+(.*)/);
        if (match) {
            return deeplyParseHeaders_1.default(match[1]);
        }
    };
});
