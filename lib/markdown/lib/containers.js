(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "markdown-it-container"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const markdown_it_container_1 = tslib_1.__importDefault(require("markdown-it-container"));
    function createContainer(name, defaultTitle) {
        return [
            markdown_it_container_1.default,
            name,
            {
                render(tokens, idx) {
                    const token = tokens[idx];
                    const info = token.info
                        .trim()
                        .slice(name.length)
                        .trim() || defaultTitle;
                    if (token.nesting === 1) {
                        return `<div class="${name} custom-block"><p class="custom-block-title">${info}</p>\n`;
                    }
                    else {
                        return `</div>\n`;
                    }
                },
            },
        ];
    }
    exports.default = md => {
        md.use(...createContainer('tip', 'TIP'))
            .use(...createContainer('warning', 'WARNING'))
            .use(...createContainer('danger', 'WARNING'))
            .use(markdown_it_container_1.default, 'v-pre', {
            render: (tokens, idx) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`),
        });
    };
});
