# API Reference

## Connection

This is the base class, which holds the connector and signer required to read and write data.

```js
const connection = new Connection({ connector, signer })
```

`connector` is a `Connector`, while `signer` is an Ethereum provider (EIP 1193).

### Connection#organization()

Returns an `Organization` at `address`:

```js
const myorg = connection.organization('myorg.aragonid.eth')
```

### Connection#deployOrganization()

Deploy a new organization.

## Connector

Connectors implement `ConnectorInterface`. A connector implement the mechanism through which all the data is going to be fetched.

Some connectors:

### ConnectorTheGraph

A connector that fetches information from a The Graph subgraph.

### ConnectorEthereumProvider

A connector that fetches information from a standard Ethereum provider (EIP 1193).

### ConnectorJson

A connector that read information from a JSON string. Useful for testing / debugging purposes.

## Organization

Represents an Aragon organization.

### Organization#apps()

A promise resolving to an array of apps installed in the organization.

### Organization#app(address)

A promise resolving to a specific app in the organization.

### Organization#addApp(repoId, params)

Install a new app into the organization.

### Organization#removeApp(appId)

Remove an app from the organization.

### Organization#permissions()

A promise resolving to the permissions of an organization.

### Organization#addPermission(appId, roleId, address)

Add a new permission.

### Organization#removePermission(appId, roleId, address)

Remove a permission.

### Organization#roleManager(appId, roleId)

Get the managor of a role.

### Organization#setRoleManager(appId, roleId, address)

Returns an array of transaction paths to set the manager of a role.

### Organization#removeRoleManager(appId, roleId)

Returns an array of transaction paths to remove the manager of a role.

### Organization#appIntent(appId, methodName, args)

Returns an array of transaction paths to execute a method on an app.

### Organization#appCall(appId, methodName, args)

Performs a read-only call on the app contract.

### Organization#appState(appId)

Get the current state of an app.

### Organization#on('app', appId, app => {})

Start receiving a specific app. Gets called every time the app updates.

### Organization#on('appEvent', appId, event => {})

Start receiving events from an app.

### Organization#on('appState', appId, appState => {})

Start receiving the state of an app.

### Organization#on('apps', apps => {})

Start receiving an array of the installed apps. Gets called every time a change happens in one of the apps.

### Organization#on('permissions', permissions => {})

Start receiving the permissions.

## App

An app installed in an organization.

## Repo

Represents an app before it gets installed in an organization.

## Role

A role can be applied to an app in order to create a permission.

## Permission

Represents a single permission.

## Permissions

Represents the permissions set in an organization.

## TransactionPath

Represents a single transaction path.
