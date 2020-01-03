(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@vue/component-compiler-utils", "./parseFrontmatter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const component_compiler_utils_1 = require("@vue/component-compiler-utils");
    const parseFrontmatter_1 = tslib_1.__importDefault(require("./parseFrontmatter"));
    function parseStrippedFrontmatter(src) {
        src = `---\n${src}\n---`;
        return parseFrontmatter_1.default(src);
    }
    exports.parseStrippedFrontmatter = parseStrippedFrontmatter;
    function parse(src) {
        const output = component_compiler_utils_1.parse({
            source: src,
            compiler: require('vue-template-compiler'),
            needMap: false,
        });
        const find = output.customBlocks.find(block => block.type === 'frontmatter');
        const frontmatterRaw = find && find.content;
        if (frontmatterRaw) {
            return parseStrippedFrontmatter(frontmatterRaw);
        }
        return {};
    }
    exports.parse = parse;
});
