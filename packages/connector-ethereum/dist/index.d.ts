import { ConnectorInterface, PermissionsType } from 'plumbery-core';
export declare type ConnectorEthereumConfig = object;
declare class ConnectorEthereum implements ConnectorInterface {
    #private;
    constructor({}: ConnectorEthereumConfig);
    permissions(orgAddress: string): Promise<PermissionsType>;
}
export default ConnectorEthereum;
//# sourceMappingURL=index.d.ts.map