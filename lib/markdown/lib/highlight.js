(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "prismjs", "prismjs/components/index", "escape-html", "chalk", "../../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const prismjs_1 = tslib_1.__importDefault(require("prismjs"));
    const index_1 = tslib_1.__importDefault(require("prismjs/components/index"));
    const escape_html_1 = tslib_1.__importDefault(require("escape-html"));
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    const utils_1 = require("../../utils");
    index_1.default(['markup', 'css', 'javascript']);
    function wrap(code, lang) {
        if (lang === 'text') {
            code = escape_html_1.default(code);
        }
        return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`;
    }
    exports.default = (str, lang) => {
        if (!lang) {
            return wrap(str, 'text');
        }
        lang = lang.toLowerCase();
        const rawLang = lang;
        if (lang === 'vue' || lang === 'html') {
            lang = 'markup';
        }
        if (lang === 'md') {
            lang = 'markdown';
        }
        if (lang === 'rb') {
            lang = 'ruby';
        }
        if (lang === 'ts') {
            lang = 'typescript';
        }
        if (lang === 'py') {
            lang = 'python';
        }
        if (lang === 'sh') {
            lang = 'bash';
        }
        if (lang === 'yml') {
            lang = 'yaml';
        }
        if (lang === 'styl') {
            lang = 'stylus';
        }
        if (!prismjs_1.default.languages[lang]) {
            try {
                index_1.default([lang]);
            }
            catch (e) {
                utils_1.logger.warn(chalk_1.default.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`));
            }
        }
        if (prismjs_1.default.languages[lang]) {
            const code = prismjs_1.default.highlight(str, prismjs_1.default.languages[lang], lang);
            return wrap(code, rawLang);
        }
        return wrap(str, 'text');
    };
});
