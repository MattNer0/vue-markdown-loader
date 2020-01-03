(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "path", "events", "loader-utils", "lru-cache", "./markdown", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const path_1 = tslib_1.__importDefault(require("path"));
    const events_1 = require("events");
    const loader_utils_1 = require("loader-utils");
    const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
    const markdown_1 = tslib_1.__importDefault(require("./markdown"));
    const utils_1 = require("./utils");
    const devCache = new lru_cache_1.default({ max: 1000 });
    const stringify = src => JSON.stringify(src)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    function default_1(src) {
        const isProd = process.env.NODE_ENV === 'production';
        const isServer = this.target === 'node';
        const options = loader_utils_1.getOptions(this) || {};
        const loader = Object.create(this);
        const { sourceDir, contentCssClass, markdown: markdownOptions } = options;
        let markdown = markdown_1.default(markdownOptions);
        const file = this.resourcePath;
        const { content, data } = utils_1.parseFrontmatter(src);
        if (!isProd && !isServer) {
            const inferredTitle = utils_1.inferTitle(data, content);
            const headers = utils_1.extractHeaders(content, ['h2', 'h3'], markdown);
            const cachedData = devCache.get(file);
            if (cachedData &&
                (cachedData.inferredTitle !== inferredTitle ||
                    JSON.stringify(cachedData.frontmatterData) !== JSON.stringify(data) ||
                    headersChanged(cachedData.headers, headers))) {
                exports.frontmatterEmitter.emit('update', file);
            }
            devCache.set(file, {
                headers,
                frontmatterData: data,
                inferredTitle,
            });
        }
        const { html } = markdown.render(content, {
            loader,
            frontmatter: data,
            relativePath: path_1.default.resolve(sourceDir, file).replace(/\\/g, '/'),
        });
        if (options.mode === 'raw') {
            return `module.exports = {
      html: ${stringify(html)},
      attributes: ${stringify(data)}
    }`;
        }
        else {
            return `<template>\n` + `<div class="content ${contentCssClass}">${html}</div>\n` + `</template>\n`;
        }
    }
    exports.default = default_1;
    function headersChanged(a, b) {
        if (a.length !== b.length) {
            return true;
        }
        return a.some((h, i) => h.title !== b[i].title || h.level !== b[i].level);
    }
    exports.frontmatterEmitter = new events_1.EventEmitter();
});
