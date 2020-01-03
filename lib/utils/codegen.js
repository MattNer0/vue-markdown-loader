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
    function pathsToModuleCode(files) {
        let index = 0;
        let code = '';
        code += files.map(filePath => `import m${index++} from ${JSON.stringify(filePath)}`).join('\n');
        code += '\n\nexport default [\n';
        for (let i = 0; i < index; i++) {
            code += `  m${i}`;
            code += i === index - 1 ? '\n' : ',\n';
        }
        code += ']\n';
        return code;
    }
    exports.pathsToModuleCode = pathsToModuleCode;
});
