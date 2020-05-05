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
var _daoClient, _appClient;
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const core_1 = require("@urql/core");
const queries_1 = require("./queries");
class ConnectorTheGraph {
    constructor({ daoSubgraphUrl, appSubgraphUrl }) {
        _daoClient.set(this, void 0);
        _appClient.set(this, void 0);
        __classPrivateFieldSet(this, _daoClient, core_1.createClient({
            fetch: typeof window === 'undefined' ? node_fetch_1.default : window.fetch,
            maskTypename: true,
            url: daoSubgraphUrl,
        })
        // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
        );
        // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
    }
    async permissions(orgAddress) {
        return await __classPrivateFieldGet(this, _daoClient).query(queries_1.QUERY_PERMISSIONS, { orgAddress })
            .toPromise()
            .then((res) => {
            var _a, _b;
            const { permissions } = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.organization) === null || _b === void 0 ? void 0 : _b.acl;
            if (!permissions) {
                return [];
            }
            return permissions.map(({ app, entity, role, }) => ({
                app: (app === null || app === void 0 ? void 0 : app.address) || '',
                entity,
                role: role.name,
            }));
        });
    }
}
_daoClient = new WeakMap(), _appClient = new WeakMap();
exports.default = ConnectorTheGraph;
//# sourceMappingURL=index.js.map