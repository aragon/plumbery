import App from './App';
import TransactionPath from './TransactionPath';
import { SignerType } from './SignerTypes';
import { ConnectorInterface } from './ConnectorTypes';
export default class Organization {
    #private;
    constructor(address: string, connector: ConnectorInterface, signer: SignerType);
    apps(): Promise<{}>;
    permissions(): Promise<import("./ConnectorTypes").PermissionsType>;
    execPaths(app: App, method: string, params: string[]): Promise<TransactionPath[]>;
}
//# sourceMappingURL=Organization.d.ts.map