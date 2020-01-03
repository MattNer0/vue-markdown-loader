(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "markdown-it-chain", "lru-cache", "./lib/highlight", "./lib/constant", "./lib/highlightLines", "./lib/preWrapper", "./lib/lineNumbers", "./lib/containers", "markdown-it-anchor", "markdown-it-emoji", "markdown-it-table-of-contents", "hash-sum", "chalk", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const markdown_it_chain_1 = tslib_1.__importDefault(require("markdown-it-chain"));
    const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
    const highlight_1 = tslib_1.__importDefault(require("./lib/highlight"));
    const constant_1 = require("./lib/constant");
    exports.PLUGINS = constant_1.PLUGINS;
    const highlightLines_1 = tslib_1.__importDefault(require("./lib/highlightLines"));
    const preWrapper_1 = tslib_1.__importDefault(require("./lib/preWrapper"));
    const lineNumbers_1 = tslib_1.__importDefault(require("./lib/lineNumbers"));
    const containers_1 = tslib_1.__importDefault(require("./lib/containers"));
    const markdown_it_anchor_1 = tslib_1.__importDefault(require("markdown-it-anchor"));
    const markdown_it_emoji_1 = tslib_1.__importDefault(require("markdown-it-emoji"));
    const markdown_it_attrs_1 = tslib_1.__importDefault(require("markdown-it-attrs"));
    const markdown_it_table_of_contents_1 = tslib_1.__importDefault(require("markdown-it-table-of-contents"));
    const hash_sum_1 = tslib_1.__importDefault(require("hash-sum"));
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    const utils_1 = require("../utils");
    exports.default = (options = {}) => {
        const { anchor, toc, plugins, lineNumbers, beforeInstantiate, afterInstantiate } = options;
        const config = new markdown_it_chain_1.default();
        config.options
            .html(true)
            .highlight(highlight_1.default)
            .end()
            .plugin(constant_1.PLUGINS.EMOJI)
            .use(markdown_it_emoji_1.default)
            .end()
            .plugin(constant_1.PLUGINS.HIGHLIGHT_LINES)
            .use(highlightLines_1.default)
            .end()
            .plugin(constant_1.PLUGINS.CUSTOM_CONTAINERS)
            .use(preWrapper_1.default)
            .end()
            .plugin(constant_1.PLUGINS.PRE_WRAPPER)
            .use(containers_1.default)
            .end()
            .plugin(constant_1.PLUGINS.ATTRS)
            .use(markdown_it_attrs_1.default)
            .end()
            .plugin(constant_1.PLUGINS.ANCHOR)
            .use(markdown_it_anchor_1.default, [
            Object.assign({
                slugify: utils_1.slugify,
                permalink: true,
                permalinkBefore: true,
                permalinkSymbol: '#',
            }, anchor),
        ])
            .end()
            .plugin(constant_1.PLUGINS.TOC)
            .use(markdown_it_table_of_contents_1.default, [
            {
                slugify: utils_1.slugify,
                includeLevel: [2, 3],
                ...toc,
            },
        ])
            .end();
        if (lineNumbers) {
            config
                .plugin(constant_1.PLUGINS.LINE_NUMBERS)
                .use(lineNumbers_1.default)
                .end();
        }
        beforeInstantiate && beforeInstantiate();
        const md = config.toMd(require('markdown-it'), options);
        afterInstantiate && afterInstantiate();
        const parse = md.parse;
        const cache = new lru_cache_1.default({ max: 1000 });
        md.parse = (src, env) => {
            const key = hash_sum_1.default(src + env.relativePath);
            const cached = cache.get(key);
            if (cached) {
                return cached;
            }
            else {
                const tokens = parse.call(md, src, env);
                cache.set(key, tokens);
                return tokens;
            }
        };
        dataReturnable(md);
        md.slugify = utils_1.slugify;
        return md;
    };
    function dataReturnable(md) {
        const render = md.render;
        md.render = (...args) => {
            md.$data = {};
            md.$data.__data_block = {};
            md.$dataBlock = md.$data.__data_block;
            const html = render.call(md, ...args);
            return {
                html,
                data: md.$data,
                dataBlockString: toDataBlockString(md.$dataBlock),
            };
        };
    }
    exports.dataReturnable = dataReturnable;
    function toDataBlockString(ob) {
        if (Object.keys(ob).length === 0) {
            return '';
        }
        return `<data>${JSON.stringify(ob)}</data>`;
    }
    function isRequiredPlugin(plugin) {
        return constant_1.REQUIRED_PLUGINS.includes(plugin);
    }
    exports.isRequiredPlugin = isRequiredPlugin;
    function removePlugin(config, plugin) {
        utils_1.logger.debug(`Built-in markdown-it plugin ${chalk_1.default.green(plugin)} was removed.`);
        config.plugins.delete(plugin);
    }
    exports.removePlugin = removePlugin;
    function removeAllBuiltInPlugins(config) {
        Object.keys(constant_1.PLUGINS).forEach(key => {
            if (!isRequiredPlugin(constant_1.PLUGINS[key])) {
                removePlugin(config, constant_1.PLUGINS[key]);
            }
        });
    }
    exports.removeAllBuiltInPlugins = removeAllBuiltInPlugins;
});
