export { default as GraphQLWrapper } from './core/GraphQLWrapper'

export { ConnectorTheGraphConfig } from "./org";

import ConnectorTheGraph from "./org";
export default ConnectorTheGraph

export { default as VotingConnectorTheGraphConfig } from "./voting";
export { default as Voting } from './voting/entities/Voting'
export { default as Vote } from './voting/entities/Vote'
export { default as Cast } from './voting/entities/Cast'