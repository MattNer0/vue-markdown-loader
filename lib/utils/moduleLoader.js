(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "semver", "./env"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const semver_1 = tslib_1.__importDefault(require("semver"));
    const env_1 = tslib_1.__importDefault(require("./env"));
    function resolveFallback(request, options) {
        const Module = require('module');
        const isMain = false;
        const fakeParent = new Module('', null);
        const paths = [];
        for (let i = 0; i < options.paths.length; i++) {
            const path = options.paths[i];
            fakeParent.paths = Module._nodeModulePaths(path);
            const lookupPaths = Module._resolveLookupPaths(request, fakeParent, true);
            if (!paths.includes(path))
                paths.push(path);
            for (let j = 0; j < lookupPaths.length; j++) {
                if (!paths.includes(lookupPaths[j]))
                    paths.push(lookupPaths[j]);
            }
        }
        const filename = Module._findPath(request, paths, isMain);
        if (!filename) {
            const err = new Error(`Cannot find module '${request}'`);
            err.code = 'MODULE_NOT_FOUND';
            throw err;
        }
        return filename;
    }
    const resolve = semver_1.default.satisfies(process.version, '>=10.0.0') ? require.resolve : resolveFallback;
    function resolveModule(request, context) {
        let resolvedPath;
        if (env_1.default.isTest) {
            return require.resolve(request);
        }
        const paths = [context || process.cwd(), ...module.paths];
        resolvedPath = resolve(request, { paths });
        return resolvedPath;
    }
    exports.resolveModule = resolveModule;
    function loadModule(request, context, force = false) {
        const resolvedPath = resolveModule(request, context);
        if (resolvedPath) {
            if (force) {
                clearRequireCache(resolvedPath);
            }
            return require(resolvedPath);
        }
    }
    exports.loadModule = loadModule;
    function clearModule(request, context) {
        const resolvedPath = resolveModule(request, context);
        if (resolvedPath) {
            clearRequireCache(resolvedPath);
        }
    }
    exports.clearModule = clearModule;
    function clearRequireCache(id, map = new Map()) {
        const module = require.cache[id];
        if (module) {
            map.set(id, true);
            module.children.forEach((child) => {
                if (!map.get(child.id))
                    clearRequireCache(child.id, map);
            });
            delete require.cache[id];
        }
    }
});
