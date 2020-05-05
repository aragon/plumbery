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
var _address, _connector, _signer;
Object.defineProperty(exports, "__esModule", { value: true });
class Organization {
    constructor(address, connector, signer) {
        _address.set(this, void 0);
        _connector.set(this, void 0);
        _signer.set(this, void 0);
        __classPrivateFieldSet(this, _address, address);
        __classPrivateFieldSet(this, _connector, connector);
        __classPrivateFieldSet(this, _signer, signer);
    }
    // List of the apps installed in the organization
    async apps() {
        return {};
    }
    // List of the apps installed in the organization
    async permissions() {
        return __classPrivateFieldGet(this, _connector).permissions(__classPrivateFieldGet(this, _address));
    }
    // Get the transaction paths that could work to execute something
    async execPaths(app, method, params) {
        return [];
    }
}
exports.default = Organization;
_address = new WeakMap(), _connector = new WeakMap(), _signer = new WeakMap();
//# sourceMappingURL=Organization.js.map