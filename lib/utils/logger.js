(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "chalk"], factory);
    }
})(function (require, exports) {
    'use strict';
    const tslib_1 = require("tslib");
    const chalk_1 = tslib_1.__importDefault(require("chalk"));
    class Logger {
        constructor(options) {
            this.options = Object.assign({
                logLevel: process.argv.includes('--debug') ? 4 : 3,
            }, options);
        }
        setOptions(options) {
            Object.assign(this.options, options);
        }
        debug(...args) {
            if (this.options.logLevel < 4) {
                return;
            }
            this.status('magenta', 'debug', ...args);
        }
        warn(...args) {
            if (this.options.logLevel < 2) {
                return;
            }
            console.warn(chalk_1.default.yellow('warning'), ...args);
        }
        error(...args) {
            if (this.options.logLevel < 1) {
                return;
            }
            process.exitCode = process.exitCode || 1;
            console.error(chalk_1.default.red('error'), ...args);
        }
        success(...args) {
            if (this.options.logLevel < 3) {
                return;
            }
            this.status('green', 'success', ...args);
        }
        tip(...args) {
            if (this.options.logLevel < 3) {
                return;
            }
            this.status('blue', 'tip', ...args);
        }
        info(...args) {
            if (this.options.logLevel < 3) {
                return;
            }
            this.status('cyan', 'info', ...args);
        }
        wait(...args) {
            if (this.options.logLevel < 3) {
                return;
            }
            this.status('cyan', 'wait', ...args);
        }
        status(color, label, ...args) {
            if (this.options.logLevel < 3) {
                return;
            }
            console.log(chalk_1.default[color](label), ...args);
        }
        developer(...args) {
            if (process.env.VUEPRESS_ENV !== 'developer' && !process.argv.includes('--developer')) {
                return;
            }
            this.status('cyan', 'developer', ...args);
        }
    }
    return new Logger();
});
