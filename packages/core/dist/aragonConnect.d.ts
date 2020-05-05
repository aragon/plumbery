import Connection from './Connection';
import { ConnectorInterface } from './ConnectorTypes';
import { SignerType } from './SignerTypes';
declare global {
    interface Window {
        ethereum: any;
    }
}
declare type ConnectorDeclaration = ConnectorInterface | [string, object | undefined];
declare function aragonConnect({ connector, signer, }: {
    connector: ConnectorDeclaration;
    signer: SignerType | undefined;
}): Connection;
export default aragonConnect;
//# sourceMappingURL=aragonConnect.d.ts.map