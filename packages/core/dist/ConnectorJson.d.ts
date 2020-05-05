import { ConnectorInterface, PermissionsType } from './ConnectorTypes';
export declare type ConnectorJsonConfig = {
    permissions: PermissionsType;
};
declare class ConnectorJson implements ConnectorInterface {
    #private;
    constructor({ permissions }: ConnectorJsonConfig);
    permissions(): Promise<PermissionsType>;
}
export default ConnectorJson;
//# sourceMappingURL=ConnectorJson.d.ts.map