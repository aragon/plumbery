"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plumbery_connector_ethereum_1 = __importDefault(require("plumbery-connector-ethereum"));
const plumbery_connector_thegraph_1 = __importDefault(require("plumbery-connector-thegraph"));
const Connection_1 = __importDefault(require("./Connection"));
const ConnectorJson_1 = __importDefault(require("./ConnectorJson"));
function getConnector(connector) {
    if (!Array.isArray(connector)) {
        return connector;
    }
    const [name, config = {}] = connector;
    if (name === 'json') {
        return new ConnectorJson_1.default(config);
    }
    if (name === 'thegraph') {
        return new plumbery_connector_thegraph_1.default(config);
    }
    if (name === 'ethereum') {
        return new plumbery_connector_ethereum_1.default(config);
    }
    throw new Error(`Unsupported connector name: ${name}`);
}
function getSigner(signer) {
    if (signer) {
        return signer;
    }
    if (typeof window !== 'undefined' && window.ethereum) {
        return window.ethereum;
    }
    throw new Error(`No signer provided, and aragonConnect() couldn’t detect one.`);
}
function aragonConnect({ connector, signer, }) {
    return new Connection_1.default(getConnector(connector), getSigner(signer));
}
exports.default = aragonConnect;
//# sourceMappingURL=aragonConnect.js.map