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
    const matter = require('gray-matter');
    const toml = require('toml');
    return function parseFrontmatter(content) {
        return matter(content, {
            excerpt_separator: '<!-- more -->',
            engines: {
                toml: toml.parse.bind(toml),
                excerpt: false,
            },
        });
    };
});
