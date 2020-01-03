(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "upath", "chalk", "./moduleLoader", "./tryChain", "./fallback", "hash-sum", "./datatypes"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const upath_1 = tslib_1.__importDefault(require("upath"));
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    const moduleLoader_1 = require("./moduleLoader");
    const tryChain_1 = tslib_1.__importDefault(require("./tryChain"));
    const fallback_1 = require("./fallback");
    const hash_sum_1 = tslib_1.__importDefault(require("hash-sum"));
    const datatypes_1 = require("./datatypes");
    const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/;
    class CommonModule {
        constructor(entry, name, shortcut, fromDep) {
            this.entry = entry;
            this.shortcut = shortcut;
            this.name = name;
            this.fromDep = fromDep;
        }
    }
    exports.CommonModule = CommonModule;
    class ModuleResolver {
        constructor(type, org, allowedTypes = [String], load = false, cwd) {
            this.type = type;
            this.org = org;
            this.allowedTypes = allowedTypes;
            this.load = load;
            this.cwd = cwd || process.cwd();
            if (org) {
                this.nonScopePrefix = `${org}-${type}-`;
                this.scopePrefix = `@${org}/${type}-`;
            }
            else {
                this.nonScopePrefix = `${type}-`;
            }
            this.typePrefixLength = type.length + 1;
            this.prefixSlicePosition = this.typePrefixLength + org.length + 1;
        }
        resolve(req, cwd) {
            if (cwd) {
                this.setCwd(cwd);
            }
            const { valid, warnMsg } = datatypes_1.assertTypes(req, this.allowedTypes);
            if (!valid) {
                throw new Error(`Invalid value for "${chalk_1.default.cyan(this.type)}": ${warnMsg}`);
            }
            const isStringRequest = datatypes_1.isString(req);
            const isAbsolutePath = isStringRequest && upath_1.default.isAbsolute(req);
            const resolved = tryChain_1.default([
                [this.resolveNonStringPackage.bind(this), !isStringRequest],
                [this.resolveAbsolutePathPackage.bind(this), isStringRequest && isAbsolutePath],
                [this.resolveRelativePathPackage.bind(this), isStringRequest && !isAbsolutePath],
                [this.resolveDepPackage.bind(this), isStringRequest],
            ], req);
            if (!resolved) {
                return new CommonModule(null, null, null, null);
            }
            return resolved;
        }
        setCwd(cwd) {
            this.cwd = cwd;
            return this;
        }
        resolveNonStringPackage(req) {
            const { shortcut, name } = this.normalizeRequest(req);
            return new CommonModule(req, name, shortcut, false);
        }
        resolveAbsolutePathPackage(req) {
            const normalized = fallback_1.fsExistsFallback([req, req + '.js', upath_1.default.resolve(req, 'index.js')]);
            if (!normalized) {
                throw new Error(`${req} Not Found.`);
            }
            const dirname = upath_1.default.parse(normalized).name;
            const { shortcut, name } = this.normalizeRequest(dirname);
            const module = this.load ? require(normalized) : normalized;
            return new CommonModule(module, name, shortcut, false);
        }
        resolveRelativePathPackage(req) {
            req = upath_1.default.resolve(process.cwd(), req);
            return this.resolveAbsolutePathPackage(req);
        }
        resolveDepPackage(req) {
            const { shortcut, name } = this.normalizeRequest(req);
            const entry = this.load ? moduleLoader_1.loadModule(name, this.cwd) : moduleLoader_1.resolveModule(name, this.cwd);
            return new CommonModule(entry, name, shortcut, true);
        }
        getShortcut(req) {
            return req.startsWith(this.nonScopePrefix) ? req.slice(this.prefixSlicePosition) : req;
        }
        normalizeName(req) {
            let name;
            let shortcut;
            if (req.startsWith('@')) {
                const pkg = resolveScopePackage(req);
                if (pkg) {
                    if (this.org && pkg.org === this.org) {
                        shortcut = pkg.name.startsWith(`${this.type}-`) ? pkg.name.slice(this.typePrefixLength) : pkg.name;
                        name = `${this.scopePrefix}${shortcut}`;
                    }
                    else {
                        shortcut = this.getShortcut(pkg.name);
                        name = `@${pkg.org}/${this.nonScopePrefix}${shortcut}`;
                    }
                    shortcut = `@${pkg.org}/${shortcut}`;
                }
            }
            else {
                shortcut = this.getShortcut(req);
                name = `${this.nonScopePrefix}${shortcut}`;
            }
            return { name, shortcut };
        }
        normalizeRequest(req) {
            if (datatypes_1.isString(req)) {
                return this.normalizeName(req);
            }
            if (datatypes_1.isObject(req) || datatypes_1.isFunction(req)) {
                if (datatypes_1.isString(req.name)) {
                    return this.normalizeName(req.name);
                }
                else {
                    const shortcut = `anonymous-${hash_sum_1.default(req)}`;
                    const name = `${this.nonScopePrefix}${shortcut}`;
                    return { name, shortcut };
                }
            }
            return {
                name: null,
                shortcut: null,
            };
        }
    }
    function resolveScopePackage(name) {
        if (SCOPE_PACKAGE_RE.test(name)) {
            return {
                org: RegExp.$1,
                name: RegExp.$2,
            };
        }
        return {
            org: '',
            name: '',
        };
    }
    exports.resolveScopePackage = resolveScopePackage;
    exports.getMarkdownItResolver = (cwd) => new ModuleResolver('markdown-it', '', [String, Function], true, cwd);
    exports.getPluginResolver = (cwd) => new ModuleResolver('plugin', 'vuepress', [String, Function, Object], true, cwd);
    exports.getThemeResolver = (cwd) => new ModuleResolver('theme', 'vuepress', [String], false, cwd);
});
