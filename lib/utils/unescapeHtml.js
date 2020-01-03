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
    return (html) => String(html)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x3A;/g, ':')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
});
