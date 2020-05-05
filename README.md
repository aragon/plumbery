# Plumbery (code name)

## Principles

These are some principles that we can use to make decisions. They are only indicative and shouldn’t be seen as a strict set of rules.

- **Data structures**: the data structures we expose are more important than the rest, even the API.
- **Programmatic API**: after the data structures, the way users interact with the library takes priority over the rest.
- **Approachable**: most common tasks can be accomplished with a minimum amount of code and knowledge by our users.
- **Consistent**: we should reuse names and patterns whenever possible. When it makes sense, we should align with the other Aragon pieces.
- **Flexible**: the library should be flexible enough to cover multiple cases when it makes sense. For example, a parameter expecting an `App` object could also accept the app address.
- **Familiar**: interacting with the library should have a certain sense of familiarity. For example, by providing a React version of the library because of the React popularity.
- **Simple**: a simple solution is generally preferred over a complex one that might provide more complete features or a better future-proofing.
- **Fast**: common scenarios should be as fast as possible, even at the cost of impacting less common scenarios.
- **Lightweight**: the bundle size should be as small as possible.
- **Low reliance on external libraries**: external libraries should only be used when they provide a clear benefit over the costs they add in terms of size, maintainance, complexity, performances, etc.
- **Extensible**: we should aim for a good level of extensibility if it doesn’t conflict with the other principles. For example, custom connectors can be injected but we also embed the most common ones.

## Roadmap

- [ ] API design
  - [ ] Research
  - [ ] Principles
  - [ ] Core library specification
  - [ ] React library specification
  - [ ] Connectors interface
- [ ] Core library
  - [ ] Fetch data through connectors
  - [ ] Subscribe through connectors
  - [ ] Organization data
  - [ ] Apps (and repos)
  - [ ] App state
  - [ ] Permissions (and roles)
  - [ ] Transaction paths
  - [ ] Sign transactions through Ethereum provider
  - [ ] Deploy organization
  - [ ] Documentation
  - [ ] Unit tests
- [ ] Connector: JSON
  - [ ] Implementation
  - [ ] Documentation
  - [ ] Unit tests
- [ ] Connector: TheGraph
  - [ ] Implementation
  - [ ] Documentation
  - [ ] End-to-end tests
- [ ] TheGraph subgraphs:
  - [ ] Aragon subgraph
  - [ ] Per-app subgraphs
- [ ] Connector: Ethereum
  - [ ] Fetch data
  - [ ] App state reducer
  - [ ] Documentation
  - [ ] End-to-end tests
- [ ] React library
  - [ ] Implementation
  - [ ] Documentation
  - [ ] Unit tests
- [ ] Examples:
  - [ ] Org viewer − CLI
  - [ ] Org viewer − React
  - [ ] Org viewer − Web (no React)
  - [ ] Transaction path chooser
- [ ] Developer experience:
  - [ ] README.md
  - [ ] CONTRIBUTING.md
  - [ ] Minimal steps to develop (e.g. `yarn && yarn dev`).
