(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./datatypes", "./logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const datatypes_1 = require("./datatypes");
    const logger_1 = tslib_1.__importDefault(require("./logger"));
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    function normalizeConfig(pluginsConfig) {
        const { valid, warnMsg } = datatypes_1.assertTypes(pluginsConfig, [Object, Array]);
        if (!valid) {
            if (pluginsConfig !== undefined) {
                logger_1.default.warn(`[${chalk_1.default.gray('config')}] ` + `Invalid value for "plugin" field : ${warnMsg}`);
            }
            pluginsConfig = [];
            return pluginsConfig;
        }
        if (Array.isArray(pluginsConfig)) {
            pluginsConfig = pluginsConfig.map(item => {
                return Array.isArray(item) ? item : [item];
            });
        }
        else if (typeof pluginsConfig === 'object') {
            pluginsConfig = Object.keys(pluginsConfig).map(item => {
                return [item, pluginsConfig[item]];
            });
        }
        return pluginsConfig;
    }
    exports.default = normalizeConfig;
});
