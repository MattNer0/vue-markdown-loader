(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "lru-cache", "./deeplyParseHeaders"], factory);
    }
})(function (require, exports) {
    "use strict";
    const tslib_1 = require("tslib");
    const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
    const deeplyParseHeaders_1 = tslib_1.__importDefault(require("./deeplyParseHeaders"));
    const cache = new lru_cache_1.default({ max: 1000 });
    return function (content, include = [], md) {
        const key = content + include.join(',');
        const hit = cache.get(key);
        if (hit) {
            return hit;
        }
        const tokens = md.parse(content, {});
        const res = [];
        tokens.forEach((t, i) => {
            if (t.type === 'heading_open' && include.includes(t.tag)) {
                const title = tokens[i + 1].content;
                const slug = t.attrs.find(([name]) => name === 'id')[1];
                res.push({
                    level: parseInt(t.tag.slice(1), 10),
                    title: deeplyParseHeaders_1.default(title),
                    slug: slug || md.slugify(title),
                });
            }
        });
        cache.set(key, res);
        return res;
    };
});
