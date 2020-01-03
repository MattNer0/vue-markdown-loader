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
    const RE = /{([\d,-]+)}/;
    const wrapperRE = /^<pre .*?><code>/;
    exports.default = md => {
        const fence = md.renderer.rules.fence;
        md.renderer.rules.fence = (...args) => {
            const [tokens, idx, options] = args;
            const token = tokens[idx];
            if (!token.lineNumbers) {
                const rawInfo = token.info;
                if (!rawInfo || !RE.test(rawInfo)) {
                    return fence(...args);
                }
                token.info = rawInfo.replace(RE, '').trim();
                token.lineNumbers = RE.exec(rawInfo)[1]
                    .split(',')
                    .map(v => v.split('-').map(v => parseInt(v, 10)));
            }
            const code = options.highlight ? options.highlight(token.content, token.info) : token.content;
            const rawCode = code.replace(wrapperRE, '');
            const highlightLinesCode = rawCode
                .split('\n')
                .map((split, index) => {
                const lineNumber = index + 1;
                const inRange = token.lineNumbers.some(([start, end]) => {
                    if (start && end) {
                        return lineNumber >= start && lineNumber <= end;
                    }
                    return lineNumber === start;
                });
                if (inRange) {
                    return `<div class="highlighted">&nbsp;</div>`;
                }
                return '<br>';
            })
                .join('');
            const highlightLinesWrapperCode = `<div class="highlight-lines">${highlightLinesCode}</div>`;
            return highlightLinesWrapperCode + code;
        };
    };
});
