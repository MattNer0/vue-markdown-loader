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
        const fence = md.renderer.rules.fence;
        md.renderer.rules.fence = (...args) => {
            const [tokens, idx] = args;
            const token = tokens[idx];
            const rawCode = fence(...args);
            return (`<!--beforebegin--><div class="language-${token.info.trim()} extra-class">` +
                `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`);
        };
    };
});
