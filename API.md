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

### Organization#permissions()

A promise resolving to the permissions of an organization.

### Organization#addPermission()

Add a new permission.

### Organization#removePermission()

Remove a permission.

### Organization#execPaths()

Returns an array of valid transaction paths to execute a method on an app.

### Organization#on('app', address)

Start receiving a specific app. Gets called every time the app updates.

### Organization#on('apps')

Start receiving an array of the installed apps. Gets called every time a change happens in one of the apps.

### Organization#on('app:event', address, event)

Start receiving events from an app.

### Organization#on('permissions')

Start receiving the permissions.

## App

An app installed in an organization.

## Permission

Represents a permission.

## Repo

Represents an app before it gets installed in an organization.

## Role

A role can be applied to an app in order to create a permission.

## TransactionPath

Represents a single transaction path.
