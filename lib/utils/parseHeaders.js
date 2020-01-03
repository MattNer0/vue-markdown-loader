(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./compose", "./unescapeHtml", "./parseEmojis"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const compose_1 = tslib_1.__importDefault(require("./compose"));
    const unescapeHtml_1 = tslib_1.__importDefault(require("./unescapeHtml"));
    const parseEmojis_1 = tslib_1.__importDefault(require("./parseEmojis"));
    const removeMarkdownTokens = (str) => String(str)
        .replace(/\[(.*)\]\(.*\)/, '$1')
        .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, '$2')
        .replace(/(\\)(\*|_|`|!)/g, '$2');
    const trim = (str) => str.trim();
    const parseHeaders = compose_1.default(unescapeHtml_1.default, parseEmojis_1.default, removeMarkdownTokens, trim);
    return parseHeaders;
});
