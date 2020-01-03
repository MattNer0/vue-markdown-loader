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
    exports.default = md => {
        const RE = /^<(script|style)(?=(\s|>|$))/i;
        md.renderer.rules.html_block = (tokens, idx) => {
            const content = tokens[idx].content;
            const hoistedTags = md.$data.hoistedTags || (md.$data.hoistedTags = []);
            if (RE.test(content.trim())) {
                hoistedTags.push(content);
                return '';
            }
            else {
                return content;
            }
        };
    };
});
