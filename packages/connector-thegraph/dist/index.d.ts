import { ConnectorInterface, PermissionsType } from 'plumbery-core';
declare global {
    interface Window {
        fetch: any;
    }
}
export declare type ConnectorTheGraphConfig = {
    appSubgraphUrl: (repoId: string) => string;
    daoSubgraphUrl: string;
};
declare class ConnectorTheGraph implements ConnectorInterface {
    #private;
    constructor({ daoSubgraphUrl, appSubgraphUrl }: ConnectorTheGraphConfig);
    permissions(orgAddress: string): Promise<PermissionsType>;
}
export default ConnectorTheGraph;
//# sourceMappingURL=index.d.ts.map