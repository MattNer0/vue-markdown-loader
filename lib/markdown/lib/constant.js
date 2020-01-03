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
    exports.PLUGINS = {
        COMPONENT: 'component',
        HIGHLIGHT_LINES: 'highlight-lines',
        PRE_WRAPPER: 'pre-wrapper',
        ATTRS: 'attrs',
        SNIPPET: 'snippet',
        CONVERT_ROUTER_LINK: 'convert-router-link',
        HOIST_SCRIPT_STYLE: 'hoist-script-style',
        ANCHOR: 'anchor',
        EMOJI: 'emoji',
        TOC: 'toc',
        LINE_NUMBERS: 'line-numbers',
        CUSTOM_CONTAINERS: 'custom-containers',
    };
    exports.REQUIRED_PLUGINS = [exports.PLUGINS.COMPONENT, exports.PLUGINS.ANCHOR];
});
