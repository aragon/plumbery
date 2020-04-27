# API Reference

## Connection

This is the base class, which holds the connector and signer required to read and write data.

```js
const connection = new Connection({ connector, signer })
```

`connector` is a `Connector`, while `signer` is an Ethereum provider (EIP 1193).

### API

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

### API

#### Organization#apps()

A promise resolving to an array of apps installed in the organization.

#### Organization#on('apps')

Start receiving an array of the installed apps. Gets called every time a change happens in one of the apps.

#### Organization#app(address)

A promise resolving to a specific app in the organization.

#### Organization#on('app', address)

Start receiving a specific app. Gets called every time the app updates.

#### Organization#permissions()

A promise resolving to the permissions of an organization.

#### Organization#on('permissions')

Start receiving the permissions.

## App

An app installed in an organization.

#### App#execute()

Executes a method on the app.

#### App#on('event')

Start receiving events from the app.

## Repo

Represents an app before it gets installed in an organization.

## TransactionPath

Represents a single transaction path.

## OrgPermissions

Represent the permissions that exist on an organization.

### API

#### OrgPermissions#add()

Add a new permission.

#### OrgPermissions#remove()

Remove a permission.

## Permission

Represents a permission.

## PermissionRole

A role that can be applied to an address to create a permission.
