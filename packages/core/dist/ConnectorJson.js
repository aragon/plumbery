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
var _permissions;
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectorJson {
    constructor({ permissions }) {
        _permissions.set(this, void 0);
        __classPrivateFieldSet(this, _permissions, permissions);
    }
    async permissions() {
        return __classPrivateFieldGet(this, _permissions);
    }
}
_permissions = new WeakMap();
exports.default = ConnectorJson;
//# sourceMappingURL=ConnectorJson.js.map