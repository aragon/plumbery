# Experiment: Talking to the Aragon sub-graph

## Usage

1. Install: `yarn`
2. Run: `yarn start`

Which only prints some output in the console. See index.ts' main() function to see what's triggering this output.

## Rationale

This experiment is simple typescript code that interacts with our aragon-subgraph. The whole idea behind it is to put it on par with the Aragon client (preferably with debugging capabilities), and look at the same organization, trying to reproduce here data that is currently provided by the client.

Queries are simply performed using fetch-node, i.e. POST http requests.

The interesting point that this experiment touches on, is which queries we should do to get the info we want, and if we should store this data.

## Query templating

The whole point of GraphQL is allowing ANY query, no matter how simple or complex to be done in a single endpoint. Thus, if a given UI interaction only needs a listing of the app names installed in an organization, we should be able to make the exact query that gives us that information. It would be a waste of resources (and slow) to ask for the entire set of data for the organization, just to prune it with the data we need and throw everything else away.

So, what this experiment does, is it uses query templates (./queries), and a rudimentary templating system to inject dynamic data into the queries, such as the address of the organization we want to fetch data for.

This could also be done with something more advanced. I'm sure there are packages out there that allow you to dynamically build, combine and reuse query chunks, but this may be overkill for now. We need at least some templating because we need to inject things such as the address of the organization that we want to query for. That's why I went with the rudimentary templating approach.

## To state or not to state

We could of course do an initial fetch of data to build some state on our app and parse the data that comes from the sub-graph into some sort of local schema. Such a schema could be shared by the different connectors in the tool. This state would be built as soon as the connector is instantiated and maintained behind the scenes with updates, etc. The user could potentially never ask the connector anything, while its busy behind the scenes building and maintaining this state.

Alternatively, the tool could have no state. Instead, its job is to receive requests from the user and resolve them by making atomic queries to the sub-graph.

## Feedback on the sub-graph

This is for Gabi's eyes, and a WIP list.

* Role.name is not a name, it's a hash. Could we split that to Role.name and Role.namehash

## TODO

* Discuss the issue of state with the team
* Experiment with GraphQL subscriptions
