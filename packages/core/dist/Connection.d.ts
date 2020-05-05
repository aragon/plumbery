import Organization from './Organization';
import { ConnectorInterface } from './ConnectorTypes';
export default class Connection {
    #private;
    constructor(connector: ConnectorInterface, signer: any);
    organization(address: string): Organization;
}
//# sourceMappingURL=Connection.d.ts.map