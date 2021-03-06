"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _ = require("lodash");
var crypto = require("crypto");
function create(settings) {
    var parsedSettings = _.clone(defaultSettings);
    for (var k in parsedSettings) {
        if (settings[k] !== undefined) {
            parsedSettings[k] = settings[k];
        }
    }
    if (['sha1', 'sha256', 'sha128'].indexOf(parsedSettings.algorithm) === -1) {
        throw new Error('\'algorithm\' option has been set to an unknown algorithm "' + parsedSettings.algorithm + '"');
    }
    if (isNaN(parsedSettings.saltBits)) {
        throw new Error('\'saltBytes\' option isn\'t a number');
    }
    return new PasswortInstance(parsedSettings);
}
exports.create = create;
var defaultSettings = {
    algorithm: 'sha1',
    useSalt: true,
    saltBits: 8
};
var PasswortInstance = (function () {
    function PasswortInstance(settings) {
        this.settings = settings;
    }
    PasswortInstance.prototype.hash = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        var hash = crypto.createHash(_this.settings.algorithm);
                        hash.update(text);
                        var salt = crypto.randomBytes(_this.settings.saltBits);
                        hash.update(salt);
                        var hashed = hash.digest();
                        fulfill(_this.settings.algorithm + "$" + hashed.toString('hex') + "$" + salt.toString('hex'));
                    })];
            });
        });
    };
    PasswortInstance.prototype.verify = function (clear, hashed) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        if (hashed.indexOf('$') === -1 || hashed.split('$').length !== 3) {
                            reject('malformed hash');
                            return;
                        }
                        var hashData = hashed.split('$');
                        var algorithm = hashData[0];
                        var verificationHash = hashData[1];
                        var salt = hashData[2];
                        var hash = crypto.createHash(algorithm);
                        hash.update(clear);
                        hash.update(new Buffer(salt, 'hex'));
                        if (hash.digest().toString('hex') == verificationHash) {
                            fulfill(1);
                        }
                        else {
                            fulfill(0);
                        }
                    })];
            });
        });
    };
    return PasswortInstance;
}());
exports.PasswortInstance = PasswortInstance;
//# sourceMappingURL=passwort.js.map