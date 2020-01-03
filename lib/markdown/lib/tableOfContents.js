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
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaults = {
        includeLevel: [2, 3],
        containerClass: 'table-of-contents',
        markerPattern: /^\[\[toc\]\]/im,
        listType: 'ul',
        containerHeaderHtml: '',
        containerFooterHtml: '',
    };
    exports.default = (md, options) => {
        options = Object.assign({}, defaults, options);
        const tocRegexp = options.markerPattern;
        function toc(state, silent) {
            let token;
            let match;
            if (state.src.charCodeAt(state.pos) !== 0x5b) {
                return false;
            }
            if (silent) {
                return false;
            }
            match = tocRegexp.exec(state.src);
            match = !match
                ? []
                : match.filter(function (m) {
                    return m;
                });
            if (match.length < 1) {
                return false;
            }
            token = state.push('toc_open', 'toc', 1);
            token.markup = '[[toc]]';
            token = state.push('toc_body', '', 0);
            token = state.push('toc_close', 'toc', -1);
            let newline = state.src.indexOf('\n');
            if (newline !== -1) {
                state.pos = state.pos + newline;
            }
            else {
                state.pos = state.pos + state.posMax + 1;
            }
            return true;
        }
        md.renderer.rules.toc_open = function () {
            return vBindEscape `<TOC
      :class=${options.containerClass}
      :list-type=${options.listType}
      :include-level=${options.includeLevel}
    >`;
        };
        md.renderer.rules.toc_body = function () {
            return (`<template slot="header">${options.containerHeaderHtml}</template>` +
                `<template slot="footer">${options.containerFooterHtml}</template>`);
        };
        md.renderer.rules.toc_close = function () {
            return `</TOC>`;
        };
        md.inline.ruler.after('emphasis', 'toc', toc);
    };
    function vBindEscape(strs, ...args) {
        return strs.reduce((prev, curr, index) => {
            return (prev +
                curr +
                (index >= args.length
                    ? ''
                    : `"${JSON.stringify(args[index])
                        .replace(/"/g, "'")
                        .replace(/([^\\])(\\\\)*\\'/g, (_, char) => char + '\\u0022')}"`));
        }, '');
    }
});
