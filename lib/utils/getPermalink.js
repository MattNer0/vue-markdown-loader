(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./ensureEndingSlash", "./ensureLeadingSlash"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const ensureEndingSlash_1 = tslib_1.__importDefault(require("./ensureEndingSlash"));
    const ensureLeadingSlash_1 = tslib_1.__importDefault(require("./ensureLeadingSlash"));
    return function getPermalink({ pattern, slug, date, regularPath, localePath = '/' }) {
        if (!pattern) {
            return;
        }
        slug = encodeURI(slug);
        const d = new Date(date);
        const year = d.getFullYear();
        const iMonth = d.getMonth() + 1;
        const iDay = d.getDate();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();
        const month = iMonth < 10 ? `0${iMonth}` : iMonth;
        const day = iDay < 10 ? `0${iDay}` : iDay;
        pattern = pattern.replace(/^\//, '');
        const link = localePath +
            pattern
                .replace(/:year/, String(year))
                .replace(/:month/, String(month))
                .replace(/:i_month/, String(iMonth))
                .replace(/:i_day/, String(iDay))
                .replace(/:day/, String(day))
                .replace(/:minutes/, String(minutes))
                .replace(/:seconds/, String(seconds))
                .replace(/:slug/, slug)
                .replace(/:regular/, regularPath);
        return ensureLeadingSlash_1.default(ensureEndingSlash_1.default(link));
    };
});
