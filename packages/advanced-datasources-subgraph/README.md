# Subgraph that experiments with alternative Aragon data sources

Deployed: https://thegraph.com/explorer/subgraph/ajsantander/aragon-dao-templates-mainnet?version=pending

## Current data sources

In our current subgraphs, we're using 4 DAOFactory contracts as the absolute data source entry points for the entire Aragon universe. That is, any Aragon organization, app, or token:

* Organizations: DAOFactory => DeployDAO events
* Apps: Kernel => NewAppProxy events
* Tokens: Kernel => NewAppProxy events that match the TokenManager appId, then query the TokenManager contract's token() function.

## The potential need for additional data sources

Unfortunately, this will likely not cover some cases where, for example:

* Users deploy an arganization manually.
* Users deploy a token manually and attach it to a TokenManager some time after.

So, we may need to use additional data sources such as:

* dao-templates: These emit events like DeployToken, and other events we might find useful. There are several versions of templates that have different events and event signatures (old Kits and new Templates).
* MiniMeTokenFactory: Newer versions emit an event when a token is created, but older versions dont. For example, the factory being used in mainnet doesn't.

This package explores what it would be like to include additional datasources in our subgraphs.

## Redundant data sources and lazy loading

If we ever introduce these data sources to our subgraphs, we will have data source redundancy. This means that we could detect the creation of an organization both from a DAOFactory and a dao-template. Because of this, we should review all our subgraphs and make sure that our entities are being created lazily, and that we always check if an entity exists before creating a new one.

## Speed considerations

Also, if we ever introduce additional data sources, we must keep in mind that our graphs will probably become slower to sync.

## The inhability of using call handlers

The graph not only supports event handlers but it also supports call and block handlers. Unfortunately, the last two are not supported on Rinkeby. For this reason, we're avoiding them for now.

## Over-architecturing vs a practical solution

Introducing these data sources right now might be overkill. What we can do now is provide a way for users to specify targeted data sources whenever they don't find their data on our subgraphs. E.g. forking the token manager subgraph and, instead of using the four DAOFactory data sources, specifying their TokenManager and MiniMeToken addresses.

If we detect that N users had to do this, then we should probably review our data sources and implement the more complex data source system.