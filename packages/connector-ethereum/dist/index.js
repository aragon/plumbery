"use strict";
var _daoClient, _appClient;
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectorEthereum {
    constructor({}) {
        _daoClient.set(this, void 0);
        _appClient.set(this, void 0);
    }
    async permissions(orgAddress) {
        return [];
    }
}
_daoClient = new WeakMap(), _appClient = new WeakMap();
exports.default = ConnectorEthereum;
//# sourceMappingURL=index.js.map