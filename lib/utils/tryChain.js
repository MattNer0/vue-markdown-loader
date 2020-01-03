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
    return function tryChain(resolvers, arg) {
        let response;
        for (let resolver of resolvers) {
            if (!Array.isArray(resolver)) {
                resolver = [resolver, true];
            }
            const [provider, condition] = resolver;
            if (!condition) {
                continue;
            }
            try {
                response = provider(arg);
                return response;
            }
            catch (e) { }
        }
    };
});
