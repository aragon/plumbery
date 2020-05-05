export declare type PermissionsType = {
    app: string;
    entity: string;
    role: string;
};
export interface ConnectorInterface {
    permissions(orgAddress: string): Promise<PermissionsType>;
}
//# sourceMappingURL=ConnectorTypes.d.ts.map