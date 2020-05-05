import { ConnectorInterface, Permission } from './ConnectorTypes';
export declare type ConnectorJsonConfig = {
    permissions: Permission[];
};
declare class ConnectorJson implements ConnectorInterface {
    #private;
    constructor({ permissions }: ConnectorJsonConfig);
    permissions(): Promise<Permission[]>;
}
export default ConnectorJson;
//# sourceMappingURL=ConnectorJson.d.ts.map