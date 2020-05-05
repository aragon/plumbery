"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _connector, _signer;
Object.defineProperty(exports, "__esModule", { value: true });
const Organization_1 = __importDefault(require("./Organization"));
class Connection {
    constructor(connector, signer) {
        _connector.set(this, void 0);
        _signer.set(this, void 0);
        __classPrivateFieldSet(this, _connector, connector);
        __classPrivateFieldSet(this, _signer, signer);
    }
    organization(address) {
        return new Organization_1.default(address, __classPrivateFieldGet(this, _connector), __classPrivateFieldGet(this, _signer));
    }
}
exports.default = Connection;
_connector = new WeakMap(), _signer = new WeakMap();
//# sourceMappingURL=Connection.js.map